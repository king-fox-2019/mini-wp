const Article = require("../models/article");
const User = require("../models/user")
const toUpdate = require('../helpers/updateField')
const removeGCS = require('../helpers/removeGCS')

class ArticleController {

  static findAllPosted(req, res, next) {
    let target = req.query.title || ''
    Article.find({ title: { $regex: target }, draft: false })
      .populate({ path: "author", select: "-password" })
      .sort({ updatedAt: 'desc' })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findAllDraft(req, res, next) {
    let id = req.loggedUser.id
    console.log(req.loggedUser)
    User.findById(id)
      .populate({ path: 'articles', match: { draft: true } })
      .sort({ updatedAt: 'desc' })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Article.findById(id)
      .populate({ path: "author", select: "-password" })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static findBySlug(req, res, next) {
    let { slug } = req.params
    Article.findOne({ slug })
      .populate({ path: "author", select: "-password" })
      .then(article => {
        console.log(article.author)
        res.status(200).json(article)
      })
      .catch(next)
  }

  static add(req, res, next) {
    let author = req.loggedUser.id
    let { title, content } = req.body
    let tags = req.body.tags.split(',')
    let image
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    } else {
      image = 'https://cdn-images-1.medium.com/max/500/1*a9dZ9L0vZrDQDrM0dHlXqg.png'
    }
    Article.create({ title, content, tags, author, image })
      .then(article => {
        let created = article
        return User.updateOne({ _id: author }, { $push: { articles: article._id } })
      })
      .then(({ article, updateduser }) => {
        res.status(200).json({ article, updateduser })
      })
      .catch(next)
  }

  static addDraft(req, res, next) {
    let author = req.loggedUser.id
    let { title, content } = req.body
    let tags = req.body.tags.split(',')
    let image
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    } else {
      image = ''
    }
    Article.create({ title, content, tags, author, image, draft: true })
      .then(article => {
        let created = article
        return User.updateOne({ _id: author }, { $push: { articles: article._id } })
      })
      .then(({ article, updateduser }) => {
        res.status(200).json({ article, updateduser })
      })
      .catch(next)

  }

  static remove(req, res, next) {
    console.log(req.params);
    let { id } = req.params
    let author = req.loggedUser.id
    User.updateOne({ _id: author }, { $pull: { articles: id } })
      .then(updated => {
        return Article.findById(id)
      })
      .then(article => {
        removeGCS(article.image)
        return Article.findByIdAndDelete(id)
      })
      .then(success => {
        res.status(200).json({ success, message: 'success deleting article' })
      })
      .catch(next)
  }

  static update(req, res, next) {
    let author = req.loggedUser.id
    let { id } = req.params
    let dataChanged = toUpdate(["title", "content", "tags"], req.body)
    // console.log(req.file);
    if (req.file) {
      console.log(`suk`);
      dataChanged.image = req.file.cloudStoragePublicUrl
      Article.findByIdAndUpdate(
        id,
        {
          $set: { dataChanged }
        },
        {
          omitUndefined: true,
          new: true
        })
        .then(article => {
          res.status(201).json({ article, message: 'success updated article' })
        })
        .catch(next)
    } else {

      Article.findOne({ _id: id })
        .select('image')
        .then(article => {
          console.log(article);
          dataChanged.image = article.image
          console.log(dataChanged);
          return Article.updateOne({ _id: id }, dataChanged)
        })
        .then(updated => {
          res.status(200).json(updated)
        })
        .catch(next)

    }
  }

  static tag(req, res, next) {
    Article.find({}, 'tags')
      .then(tags => {
        return ArticleController.uniqueTag(tags)
      })
      .then(tag => {
        res.status(200).json(tag)
      })
  }

  static uniqueTag(tags) {
    let tagArr = []
    let result = []
    tags.forEach((tag) => {
      tag.tags.forEach((allTag) => {
        tagArr.push(allTag)
      })
    })
    let eachTag = [...new Set(tagArr)]
    let obj = {}
    eachTag.forEach((tag) => {
      obj.name = tag
      result.push(obj)
      obj = {}
    })
    return result
  }

  static bookmark(req, res, next) {
    let { id } = req.params
    let author = req.loggedUser.id

    User.findById(author)
      .select('bookmarks')
      .then(user => {
        console.log(user);
        if (user.bookmarks.length < 1) {
          return User.updateOne({ _id: author }, { $push: { bookmarks: id } })
        }
        else {
          let already = false
          for (let i = 0; i < user.bookmarks.length; i++) {
            if (user.bookmarks[i] == id) {
              already = false
              next({ status: 409, message: 'You\'ve already bookmarked this article' })
              break;
            } else {
              already = true
            }
          }
          if (already) {
            return User.updateOne({ _id: author }, { $push: { bookmarks: id } })
          }
        }
      })
      .then(addBookmark => {
        res.status(200).json(addBookmark)
      })
      .catch(next)
  }

  static unBookmark(req, res, next) {
    console.log(req.params, req.loggedUser);
    let { id } = req.params
    let author = req.loggedUser.id
    User.findByIdAndUpdate(
      author,
      {
        $pull: { bookmarks: id }
      },
      {
        new: true
      })
      .then(user => {
        res.status(201).json({ user, message: 'success remove bookmark' })
      })
      .catch(next)
    // User.updateOne({ _id: author }, { $pull: { bookmarks: id } })
    //   .then(removeBookmark => {
    //     res.status(200).json(removeBookmark)
    //   })
    //   .catch(next)
  }


}

module.exports = ArticleController;
