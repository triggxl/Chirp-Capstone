const path = require('path')
const express = require('express')
const xss = require('xss')
const PostService = require('./posts-service')

const postsRouter = express.Router()
const jsonParser = express.json()

const serializePosts = newPost => ({
  id: newPost.id,
  title: xss(newPost.title),
  content: xss(newPost.content)
})

postsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostService.getAllPosts(knexInstance)
      .then(posts => {
        res.json(posts.map(serializePosts))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, postName } = req.body
    const post = { id, postName }

    for (const [key, value] of Object.entries(post)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    PostService.insertNewPost(
      req.app.get('db'),
      post
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(serializePosts(post))
      })
      .catch(next)
  })

postsRouter
  .route('/:post_id')
  .all((req, res, next) => {
    PostService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `Post doesn't exist` }
          })
        }
        res.post = post
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializePosts(res.post))
  })

module.exports = postsRouter