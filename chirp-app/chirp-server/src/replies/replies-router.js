const path = require('path')
const express = require('express')
const xss = require('xss')
const RepliesService = require('./folders-service')

const repliesRouter = express.Router()
const jsonParser = express.json()

const serializeReply = reply => ({
  id: newPosts.id,
  title: xss(reply.title),
  content: xss(reply.content)
})

repliesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    RepliesService.getAllReplies(knexInstance)
      .then(replies => {
        res.json(replies.map(serializeReply))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content } = req.body
    const newReply = { title, content }

    for (const [key, value] of Object.entries(newReply)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    RepliesService.insertFolder(
      req.app.get('db'),
      newReply
    )
      .then(reply => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${reply.id}`))
          .json(serializeReply(reply))
      })
      .catch(next)
  })

repliesRouter
  .route('/:reply_id')
  .all((req, res, next) => {
    RepliesService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(reply => {
        if (!reply) {
          return res.status(404).json({
            error: { message: `Reply doesn't exist` }
          })
        }
        res.reply = reply
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeReply(res.reply))
  })

module.exports = repliesRouter