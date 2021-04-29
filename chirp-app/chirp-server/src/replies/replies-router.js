const path = require('path')
const express = require('express')
const xss = require('xss')
const RepliesService = require('./replies-service')

const repliesRouter = express.Router()
const jsonParser = express.json()

// making 'safe' version of reply from db
const serializeReply = reply => ({
  id: reply.id,
  content: xss(reply.content),
  postId: reply.postid
})

repliesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    RepliesService.getAllReplies(knexInstance)
      .then(replies => {
        console.log(replies)
        res.json(replies.map(serializeReply))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    // what our client gave us
    const { content, postId, id } = req.body
    // destructuring and creating new object with new keys
    const reply = { content, postid: postId, id }

    for (const [key, value] of Object.entries(reply)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    RepliesService.insertReplies(
      req.app.get('db'),
      reply
    )
      .then(reply => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${reply.replyId}`))
          .json(serializeReply(reply))
      })
      .catch(next)
  })


repliesRouter
  .route('/:reply_id')
  .delete((req, res, next) => {
    RepliesService.deleteReplies(
      req.app.get('db'),
      req.params.reply_id
    )
      .then(reply => {
        if (!reply) {
          return res.status(404).json({
            error: { message: `Reply doesn't exist` }
          })
        }
        res.json(reply)
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeReply(res.reply))
  })
  .put(jsonParser, (req, res, next) => {
    const { content, postId, id } = req.body;
    // destructuring and creating new object with new keys server: client
    const reply = { content, postid: postId, id };

    for (const [key, value] of Object.entries(reply)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }
    RepliesService.updateReplies(req.app.get('db'), id, content)
      .then(reply => {
        res
          .json(serializeReply(reply))
      })
    // .catch(next)
  })

module.exports = repliesRouter;