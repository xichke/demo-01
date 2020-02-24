'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.create = (data) => {
  console.log('=======>>> data : ', data);
  (async () => {
    var item = new User(data);
    await item.save();
    console.log('======>>> item : ', item);
  })().catch(err => {
    console.log('======>>> err : ', err);
    throw new Error(err);
  });
}

// exports.read = function(req, res) {
//   Model.find().sort('-created').exec(function(err, articles) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(articles);
//     }
//   });
// };

// exports.update = function(req, res) {
//   var item = req.user;
//   article.title = req.body.title;
//   article.content = req.body.content;
//   article.save(function(err) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(article);
//     }
//   });
// };

// exports.delete = function(req, res) {
//   var article = req.article;

//   article.remove(function(err) {
//     if (err) {
//       throw new Error(err);
//     } else {
//       res.json(article);
//     }
//   });
// };