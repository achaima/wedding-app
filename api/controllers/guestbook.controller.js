const Post = require('../models/guestbook.model');
const moment = require('moment');

function createPost(req, res) {
  const date = moment();
  const time = date.format('D MMM YY, hh:mm');
  req.body['timestamp']= time;
  Post.create(req.body, function (err) {
    if(err) {
      return res.json(err, 'could not retrive this post');
    } else {
      return res.status(200).json({Post});
    }
  });
}

function getAllPost(req, res) {
  Post.find(function(err, posts) {
    if(err) {
      return res.json(err, 'could not retreive all posts');
    } else {
      return res.status(200).json(posts);
    }
  });
}

module.exports = {
  createPost: createPost,
  getAllPost: getAllPost
};
