const NewPostsService = {
  getAllFolders(knex) {
    return knex.select('*').from('newPosts')
  },

  insertFolders(knex, newPosts) {
    return knex
      .insert(newPosts)
      .into('newPosts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('newPosts')
      .select('*')
      .where('id', id)
      .first()
  },

  deletePosts(knex, id) {
    return knex('newPosts')
      .where({ id })
      .delete()
  },

  updatePosts(knex, id, newPostsFields) {
    return knex('newPosts')
      .where({ id })
      .update(newPostsFields)
  },
}

module.exports = NewPostsService

// client is making a GET request to /newPosts and /notes....undefined id error need to figure out why it's throwing this error....use Postman to make requests to each endpoint to figure out why each route isn't working
