const RepliesService = {
  getAllReplies(knex) {
    return knex.select('*').from('reply')
  },

  insertReplies(knex, reply) {
    return knex
      .insert(reply)
      .into('reply')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('reply')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteReplies(knex, id) {
    return knex('reply')
      .where({ id })
      .delete()
  },

  updateReplies(knex, id, title, content, replyFields) {
    return knex('reply')
      .where({ id, title, content })
      .update(replyFields)
  },
}

module.exports = RepliesService