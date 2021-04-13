const RepliesService = {
  getAllReplies(knex) {
    return knex.select('*').from('newReply')
  },

  insertReplies(knex, newReply) {
    return knex
      .insert(newReply)
      .into('newReply')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('newReply')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteReplies(knex, id) {
    return knex('newReply')
      .where({ id })
      .delete()
  },

  updateReplies(knex, id, title, content, newReplyFields) {
    return knex('newReply')
      .where({ id, title, content })
      .update(newReplyFields)
  },
}

module.exports = RepliesService