const Article = require('../models/article')

class ArticleController {
  static findAll(req, res, next) {
    let topic = req.query.topic || ''
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
    console.log(topic, "mau dongengapaaaa");
    let filter = {}
    if(topic && topic !== 'all') {
      filter['tags.key'] = `${topic}`
    }
    if (req.loggedUser) {
      console.log(req.loggedUser, "user nya manaaaa???");
      
      filter.user = req.loggedUser._id
    }
    let count
  
    console.log(filter)
    Article.countDocuments(filter)
     .then(n => {
        count = n
        return Article.find(filter).skip(limit * (page - 1)).limit(limit).sort({ createdAt: "desc" })
      })
      .then(articles => {
        res.status(200).json({ count, articles })
      })
      .catch(next)


    /*
    balikan postman

    request
      Article,countDocuments({'tags.key})

      response
{
  "count": 2,
  "articles": [
      {
          "image": "https://storage.googleapis.com/femme-featured-images/1575820369546-190614HydrogenPR.jpg",
          "tags": [
              {
                  "key": "activity-books",
                  "value": "Activity Books"
              },
              {
                  "key": "animals-and-nature",
                  "value": "Animals And Nature"
              }
          ],
          "_id": "5ded1c5236386c015a91f8ae",
          "title": "1",
          "content": "1",
          "user": "5de679c323975138ab3f8f53",
          "createdAt": "2019-12-08T15:52:50.280Z",
          "updatedAt": "2019-12-08T15:52:50.280Z"
      },
      {
          "image": "https://storage.googleapis.com/femme-featured-images/1575820392385-drops-of-water-water-nature-liquid-40784.jpg",
          "tags": [
              {
                  "key": "activity-books",
                  "value": "Activity Books"
              },
              {
                  "key": "mindfulness-and-manners",
                  "value": "Mindfulness And Manners"
              }
          ],
          "_id": "5ded1c6836386c015a91f8af",
          "title": "updated",
          "content": "2",
          "user": "5de679c323975138ab3f8f53",
          "createdAt": "2019-12-08T15:53:12.986Z",
          "updatedAt": "2019-12-08T16:24:16.187Z"
      }
  ]
}


model requirest yang :

haislnya :

{
    "count": 2,
    "articles": [
        {
            "_id": "5ded1c5236386c015a91f8ae"
        },
        {
            "_id": "5ded1c6836386c015a91f8af"
        }
    ]
}
    */




  }


  // static findMyArticle(req, res, next) {
  //   console.log("masuk find my article")

  //   Article.find({ user: req.loggedUser._id })
  //     .then(articles => {
  //       // console.log(articles, 'ada kan yg article punya user')
  //       res.status(200).json(articles)
  //     })
  //     .catch(next)

  // }

  static findOne(req, res, next) {
    let id = req.params.id
    Article.findById(id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static create(req, res, next) {
    console.log(req.body);
    const user = req.loggedUser.id
    let { title, content, tags, image } = req.body
    tags = JSON.parse(tags)
    Article.create({ title, content, tags, image, user })
      .then(article => {
        // console.log(article);

        res.status(201).json(article)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Article.findByIdAndDelete(id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static update(req, res, next) {
    console.log("MASUK MAU UPDATE DR SERVER INI");

    let id = req.params.id
    let { title, content, tags, image } = req.body
    console.log(req.body, "update dr server")
    Article.findByIdAndUpdate(id, { title, content, tags, image }, { omitUndefined: true, new: true, runValidators: true })
      .then(article => {
        console.log(article, "updated")
        res.status(200).json({ data: article, msg: 'ok' })
      })
      .catch(next)
  }
}

module.exports = ArticleController