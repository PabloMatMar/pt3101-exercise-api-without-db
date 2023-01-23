const express = require('express');
const post = express.Router();
const postControllers = require ('../controllers/postControllers')

post.post('/', postControllers.postUser)

module.exports = post;