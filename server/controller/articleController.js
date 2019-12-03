let Article = require("../models/article");
const mongoose = require('mongoose')

class articleController {
  static getArticles = (req, res, next) => {
    if (req.query.title && req.query.title!=='') {
        Article.find({title:{$regex: '.*'+req.query.title+'.*'}})
        .then(articles=>res.status(200).json(articles))
        .catch(err => next(err))
    } else if(req.query.id){
        Article.findById(req.query.id)
        .then(article=>res.status(200).json(article))
        .catch(err=>next(err))
    } else {
      Article.find({})
        .then(articles => res.status(200).json(articles))
        .catch(err => next(err));
    }
  };
  static createArticle = (req, res, next) => {
    Article.create({
      title: req.body.title,
      tag: req.body.tag,
      content: req.body.content
    })
      .then(article => res.status(201).json(article))
      .catch(err => next(err));
  };
  static deleteArticle = (req,res,next) => {
      Article.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
      .then(result=>res.status(201).json(result))
      .catch(err => next(err))
  }
  static updateArticle = (req,res,next) => {
      Article.updateOne({_id:mongoose.Types.ObjectId(req.body.id)},{$set:{
          title:req.body.title,
          tag:req.body.tag,
          content:req.body.content
      }})
      .then(result=>res.status(201).json(result))
      .catch(err=>next(err))
  }
}

module.exports = articleController;
