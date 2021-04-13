const knex = require('knex')
const app = require('../src/app')
const { makeNewPostArray, makeMaliciousPost } = require('./newPosts/newPosts.fixtures')

describe('New posts Endpoints', function () {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('newPosts').truncate())

  afterEach('cleanup', () => db('newPosts').truncate())

  describe(`GET /newPosts`, () => {
    context(`Given no newPosts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/newPosts')
          .expect(200, [])
      })
    })

    context('Given there are newPosts in the database', () => {
      const testNewPosts = makeNewPostArray()

      beforeEach('insert newPosts', () => {
        return db
          .into('newPosts')
          .insert(testNewPosts)
      })

      it('responds with 200 and all of the newPosts', () => {
        return supertest(app)
          .get('/api/newPosts')
          .expect(200, testNewPosts)
      })
    })

    context(`Given an XSS attack newPost`, () => {
      const { maliciousNewPost, expectedNewPost } = makeMaliciousPost()

      beforeEach('insert malicious newPost', () => {
        return db
          .into('newPosts')
          .insert([maliciousNewPost])
      })
      it('removes XSS attack id', () => {

        return supertest(app)
          .get(`/api/newPosts`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].id).to.eql(expectedNewPost.id)
            expect(res.body[0].title).to.eql(expectedNewPost.title)
            expect(res.body[0].content).to.eql(expectedNewPost.content)
          })
      })
    })
  })

  describe(`GET /newPosts/:post_id`, () => {
    context(`Given no newPosts`, () => {
      it(`responds with 404`, () => {
        const newPostId = 123456
        return supertest(app)
          .get(`/api/newPosts/${newPostId}`)
          .expect(404, { error: { message: `New Post doesn't exist` } })
      })
    })

    context('Given there are newPosts in the database', () => {
      const testNewPosts = makeNewPostArray()

      beforeEach('insert newPosts', () => {
        return db
          .into('newPosts')
          .insert(testNewPosts)
      })

      it('responds with 200 and the specified newPost', () => {
        const newPostId = 2
        const expectedNewPost = testNewPosts[newPostId - 1]
        return supertest(app)
          .get(`/api/newPosts/${newPostId}`)
          .expect(200, expectedNewPost)
      })
    })

    context(`Given an XSS attack newPost`, () => {
      const { maliciousNewPost, expectedNewPost } = makeMaliciousPost()

      beforeEach('insert malicious newPost', () => {
        return db
          .into('newPosts')
          .insert([maliciousNewPost])
      })
      it('removes XSS attack id', () => {

        return supertest(app)
          .get(`/api/newPosts/${maliciousNewPost.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.id).to.eql(expectedNewPost.id)
            expect(res.body.title).to.eql(expectedNewPost.title)
            expect(res.body.content).to.eql(expectedNewPost.content)
          })
      })
    })
  })

  describe(`POST /newPosts`, () => {
    it(`creates a newPost, responding with 201 and the new newPost`, function () {
      this.retries(3)
      const newPost = {
        id: 'Test new post id...',
        title: 'Test new post',
        content: 'Test new post content'
      }
      // process.on('uncaughtException', unhandledExceptionCallback);
      return supertest(app)
        .post('/api/newPosts')
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newPost.title)
          expect(res.body.id).to.eql(newPost.id)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/newPosts/${res.body.id}`)
          const expected = new Date().toLocaleString()
          const actual = new Date(res.body.date_published).toLocaleString()
          expect(actual).to.eql(expected)
        })
        .then(res =>
          supertest(app)
            .get(`/api/newPosts/${res.body.id}`)
            .expect(res.body)
        )
    })
    const requiredFields = ['id', 'title', 'content']


    requiredFields.forEach(field => {
      const newPost = {
        title: 'Test new post',
        id: 'Test new post id...',
        content: 'Test new post content'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newPost[field]
        return supertest(app)
          .post('/api/newPosts')
          .send(newPost)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })
    it('removes XSS attack id from response', () => {

      const { maliciousPost, expectedNewPost } = makeMaliciousPost()
      // process.on('uncaughtException', unhandledExceptionCallback);
      // https://stackoverflow.com/questions/34699457/how-do-i-get-the-actual-server-error-when-running-supertest-in-mocha
      return supertest(app)
        .post(`/api/newPosts`)
        .send(maliciousPost)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(expectedNewPost.id)
          expect(res.body.title).to.eql(expectedNewPost.title)
          expect(res.body.content).to.eql(expectedNewPost.content)
        })
    })
  })

  describe(`DELETE /api/newPosts/:post_id`, () => {
    context(`Given no newPosts`, () => {
      it(`responds with 404`, () => {
        const newPostId = 12345
        return supertest(app)
          .delete(`/api/newPosts/${newPostId}`)
          .expect(404, { error: { message: `Post doesn't exist` } })
      })
      context('Given there are newPosts in the database', () => {
        const testNewPosts = makeNewPostArray()

        beforeEach('insert newPosts', () => {
          return db
            .into('newPosts')
            .insert(testNewPosts)
        })

        it('responds with 204 and removes the newPost', () => {
          const idToRemove = 2
          const expectedNewPosts = testNewPosts.filter(newPost => newPost.id !== idToRemove)
          return supertest(app)
            .delete(`/api/newPosts/${idToRemove}`)
            .expect(204)
            .then(res =>
              supertest(app)
                .get(`/api/newPosts`)
                .expect(expectedNewPosts)
            )
        })
      })
    })

    describe(`PATCH /api/newPosts/:folder_id`, () => {
      context(`Given no newPosts`, () => {
        it(`responds with 404`, () => {
          const newPostId = 123456
          return supertest(app)
            .delete(`/api/newPosts/${newPostId}`)
            .expect(404, { error: { message: `Folder doesn't exist` } })
        })
      })

      context('Given there are newPosts in the database', () => {
        const testNewPosts = makeNewPostArray()

        beforeEach('insert newPosts', () => {
          return db
            .into('newPosts')
            .insert(testNewPosts)
        })

        it('responds with 204 and updates the newPost', () => {
          const idToUpdate = 2
          const updateNewPost = {
            id: 'updated new post id',
            title: 'updated new post title',
            content: 'updated new post content'
          }
          const expectedNewPost = {
            ...testNewPosts[idToUpdate - 1],
            ...updateNewPost
          }
          return supertest(app)
            .patch(`/api/newPosts/${idToUpdate}`)
            .send(updateNewPost)
            .expect(204)
            .then(res =>
              supertest(app)
                .get(`/api/newPosts/${idToUpdate}`)
                .expect(expectedNewPost)
            )
        })

        it(`responds with 400 when no required fields supplied`, () => {
          const idToUpdate = 2
          return supertest(app)
            .patch(`/api/newPosts/${idToUpdate}`)
            .send({ irrelevantField: 'foo' })
            .expect(400, {
              error: {
                message: `Request body must have a 'title'`
              }
            })
        })

        it(`responds with 204 when updating only a subset of fields`, () => {
          const idToUpdate = 2
          const updateNewPost = {
            title: 'updated newPost title',
          }
          const expectedNewPost = {
            ...testNewPosts[idToUpdate - 1],
            ...updateNewPost
          }

          return supertest(app)
            .patch(`/api/newPosts/${idToUpdate}`)
            .send({
              ...updateNewPost,
              fieldToIgnore: 'should not be in GET response'
            })
            .expect(204)
            .then(res =>
              supertest(app)
                .get(`/api/newPosts/${idToUpdate}`)
                .expect(expectedNewPost)
            )
        })
      })
    })
  })
})