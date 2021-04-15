const PostsService = {
  getAllPosts(knex) {
    return knex.select('*').from('posts')
  },

  insertPosts(knex, posts) {
    return knex
      .insert(posts)
      .into('posts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('posts')
      .select('*')
      .where('id', id)
      .first()
  },

  deletePosts(knex, id) {
    return knex('posts')
      .where({ id })
      .delete()
  },

  updatePosts(knex, id, postsFields) {
    return knex('posts')
      .where({ id })
      .update(postsFields)
  },
}

module.exports = PostsService

// client is making a GET request to /posts and /notes....undefined id error need to figure out why it's throwing this error....use Postman to make requests to each endpoint to figure out why each route isn't working
