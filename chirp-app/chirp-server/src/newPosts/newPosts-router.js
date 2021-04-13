const path = require('path')
const express = require('express')
const xss = require('xss')
const NewPostsService = require('./newPosts-service')

const newPostsRouter = express.Router()
const jsonParser = express.json()

const serializePosts = newPost => ({
  id: newPost.id,
  title: xss(newPost.title),
  content: xss(newPost.content)
})

newPostsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    NewPostsService.getAllnewPosts(knexInstance)
      .then(folders => {
        res.json(folders.map(serializePosts))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { id, folderName } = req.body
    const newPost = { id, folderName }

    for (const [key, value] of Object.entries(newPost)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    NewPostsService.insertNewPost(
      req.app.get('db'),
      newPost
    )
      .then(newPost => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(serializePosts(newPost))
      })
      .catch(next)
  })

newPostsRouter
  .route('/:newPost_id')
  .all((req, res, next) => {
    NewPostsService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Post doesn't exist` }
          })
        }
        res.newPost = newPost
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializePosts(res.newPost))
  })

module.exports = newPostsRouter