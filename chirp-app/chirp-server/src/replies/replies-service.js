const RepliesService = {
  getAllReplies(knex) {
    return knex.select('*').from('replies')
  },

  insertReplies(knex, replies) {
    return knex
      .insert(replies)
      .into('replies')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('replies')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteReplies(knex, id) {
    return knex('replies')
      .where({ id })
      .delete()
  },

  updateReplies(knex, id, title, content, replyFields) {
    return knex('replies')
      .where({ id, title, content })
      .update(replyFields)
  },
}

module.exports = RepliesService;