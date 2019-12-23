
# mini-wp

  
  

# ***Brightly***

  

  

  

# **Error**

  

  

-  **code** : 400

  

-  **name** : Bad Request

  

-  **error response :**

  

  

```
{

"message": "Email is already used"

}

```

  

  

-  **code** : 403

  

-  **name** : forbidden

  

  

-  **error response :**

  

  

```
{
"message": "Not authorized"
}
```

  

  

-  **code** : 404

  

-  **name** : Not Found

  

```
{
"message": "User not found" / "Article not found"
}
```

  

  

- **code** : 500

  

- **name** : Internal Server Error

  

  

- **error response :**

  

  

```
{
"message": "Internal Server Error"
}

```

  

  

# **User**

  

  

> REGISTER

  

  

- **URL**

  

`http://localhost:3000/users/register`

  

- **Method**

  

`POST`

  

- **Data Params**

  

**body :**

  

| Property |Type |Description |

|----------------|-------------------------------|-----------------------------|

|`name`|string |user's name |

|`email` |string |user's email |

|`password` |string|user's password|

  
  
  

  

- **Success Response :**

  

**code** : 201

  

**content example :**

  

  

```

  

{

  

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM4YTI5MmRkZDM0ZTE3NDA2NThkODciLCJlbWFpbCI6ImF1ZHJleUBtYWlsLmNvbSIsImlhdCI6MTU3MzQyOTkwNn0.eVMxFCWA_RpxMPfnPbEpIGhqigw7Bhvset0V_0RwNuo",

  

"_id": "5dc8a292ddd34e1740658d87",

  

"email": "audrey@mail.com"

  

}

  

```

  

  

> LOGIN

  

  

- **URL**

  

`http://localhost:3000/users/login`

  

- **Method**

  

`POST`

  

- **Data Params**

  

**body :**

  

| Property |Type |Description |

|----------------|-------------------------------|-----------------------------|

|`email`|string |user's email |

|`password` |string |user's passwords |

  
  
  

  

- **Success Response :**

  

**code** : 200

  

**content example :**

  

  

```
{

"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWRhYmFmNzBlMzg5MTY5YjYzYTBhZCIsImVtYWlsIjoiamVzaWNhQG1haWwuY29tIiwiaWF0IjoxNTc1ODU3MTMwfQ.7L3Iv_U1SHROeMuEaYTn4BwIEvRSEnV8lEJTy_eCDII",

"id":  "5dedabaf70e389169b63a0ad",

"email":  "jesica@mail.com"

}
```

  

  

# **Article**

  

  

> Read All Article on query

  

  

- **URL**

  

`http://localhost:3000/articles?topic=activity-books`

  

- **Method**

  

`GET`

  

- **Data Params :** none
- **Data Query :** topic : activity-books
  

  

- **Success Response :**

  

**code** : 200

  

**content example :**

  

  

```
{

"count":  2,

"articles":  [

{

"image":  "https://storage.googleapis.com/femme-featured-images/1575820392385-drops-of-water-water-nature-liquid-40784.jpg",

"tags":  [

{

"key":  "activity-books",

"value":  "Activity Books"

},

{

"key":  "mindfulness-and-manners",

"value":  "Mindfulness And Manners"

}

],

"_id":  "5ded1c6836386c015a91f8af",

"title":  "updated",

"content":  "2",

"user":  "5de679c323975138ab3f8f53",

"createdAt":  "2019-12-08T15:53:12.986Z",

"updatedAt":  "2019-12-08T16:24:16.187Z"

},

{

"image":  "https://storage.googleapis.com/femme-featured-images/1575820369546-190614HydrogenPR.jpg",

"tags":  [

{

"key":  "activity-books",

"value":  "Activity Books"

},

{

"key":  "animals-and-nature",

"value":  "Animals And Nature"

}

],

"_id":  "5ded1c5236386c015a91f8ae",

"title":  "1",

"content":  "1",

"user":  "5de679c323975138ab3f8f53",

"createdAt":  "2019-12-08T15:52:50.280Z",

"updatedAt":  "2019-12-08T15:52:50.280Z"

}

]

}

```



> Read All User's Article 

  

  

- **URL**

  

`http://localhost:3000/articles/mine`

  

- **Method**

  

`GET`

  

- **Data Params :** none
  

  

- **Success Response :**

  

**code** : 200

  

**content example :**


```
{

"count":  2,

"articles":  [

{

"image":  "https://storage.googleapis.com/femme-featured-images/1575820392385-drops-of-water-water-nature-liquid-40784.jpg",

"tags":  [

{

"key":  "activity-books",

"value":  "Activity Books"

},

{

"key":  "mindfulness-and-manners",

"value":  "Mindfulness And Manners"

}

],

"_id":  "5ded1c6836386c015a91f8af",

"title":  "updated",

"content":  "2",

"user":  "5de679c323975138ab3f8f53",

"createdAt":  "2019-12-08T15:53:12.986Z",

"updatedAt":  "2019-12-08T16:24:16.187Z"

},

{

"image":  "https://storage.googleapis.com/femme-featured-images/1575820369546-190614HydrogenPR.jpg",

"tags":  [

{

"key":  "activity-books",

"value":  "Activity Books"

},

{

"key":  "animals-and-nature",

"value":  "Animals And Nature"

}

],

"_id":  "5ded1c5236386c015a91f8ae",

"title":  "1",

"content":  "1",

"user":  "5de679c323975138ab3f8f53",

"createdAt":  "2019-12-08T15:52:50.280Z",

"updatedAt":  "2019-12-08T15:52:50.280Z"

}

]

}

```

  

> Find one by article id

  

  

- **URL**

  

`http://localhost:3000/articles/:id`

  

- **Method**

  

`GET`

  

- **Data Params :** none

  

  

- **Success Response :**

  

**code** : 200

  

**content example :**

  

  

```

  

  

{

  

"article": {

  

"tags": [

  

"womanhood",

  

"pride",

  

"fighting"

  

],

  

"_id": "5dc18ad74cf1c3399ad26087",

  

"title": "Proud to be a woman: Womanhood, old age, and emotions",

  

"content": "The study is based on narrative interviews with female members of the University of the Third Age (U3A). The main findings describe older women who actively engage with discourses of gender to embark on positive constructions of womanhood. They create their own spaces for women’s activism that are filled with positive emotions mobilized to support each other. This article discusses such findings and their relevance to the study of old age and gender.",

  

"image": "https://i.pinimg.com/564x/a0/d6/7d/a0d67dfed2d6225fb22ebbd74cf6dce8.jpg",

  

"created_at": "2019-11-05T14:44:39.958Z",

  

"updatedAt": "2019-11-05T14:44:39.958Z"

  

}

  

}

  

  

```

  

  

> CREATE

  

  

- **URL**

  

`http://localhost:3000/articles`

  

- **Method**

  

`POST`

  

- **Data Params**

  

**body :**

  

| Property |Type |Description |

|----------------|-------------------------------|-----------------------------|

|`title`|string |user's article's title, REQUIRED | |
|`content` |string |user's article's content, REQUIRED |
|`image` |string |user's article's image source, REQUIRED |
`tags` |string |user's article's tags based on avaliability, REQUIRED |

  

  

  

- **Success Response :**

  

**code** : 201

  

**content example :**

  

  

```

  

{

  

"tags": [

  

"womanhood",

  

"pride",

  

"fighting"

  

],

  

"_id": "5dc18ad74cf1c3399ad26087",

  

"title": "Proud to be a woman: Womanhood, old age, and emotions",

  

"content": "The study is based on narrative interviews with female members of the University of the Third Age (U3A). The main findings describe older women who actively engage with discourses of gender to embark on positive constructions of womanhood. They create their own spaces for women’s activism that are filled with positive emotions mobilized to support each other. This article discusses such findings and their relevance to the study of old age and gender.",

  

"imgSrc": "https://i.pinimg.com/564x/a0/d6/7d/a0d67dfed2d6225fb22ebbd74cf6dce8.jpg",

  

"created_at": "2019-11-05T14:44:39.958Z",

  

"updatedAt": "2019-11-05T14:44:39.958Z",

  

}

  

  

```

  

  

> Delete

  

  

- **URL**

  

`http://localhost:3000/articles/:id`

  

- **Method**

  

`DELETE`

  

- **Data Params :** none

  

  

- **Success Response :**

  

**code** : 200

  

**content example :**

  

  

```

  

{

  

"tags": [

  

"womanhood",

  

"pride"

  

],

  

"_id": "5dc18bcd4cf1c3399ad26088",

  

"title": "Body image, aging, and identity in women over 50: The Gender and Body Image (GABI) study",

  

"content": "We conducted a qualitative study of 1,849 women over age 50 to capture the thoughts, feelings, and attitudes that women at middle age have about their bodies and the experience of aging. Via an open-ended question online survey, four primary themes emerged: (a) the physical and psychological experience of aging; (b) the injustices, inequities, and challenges of aging; (c) the importance of self-care; and (d) a plea for recognition of the need to maintain a contributory role in society. Results highlight the complexities of women’s psychological and physical aspects of aging and point toward important topics worthy of further study in this growing population.",

  

"image": "https://i.pinimg.com/564x/8c/e3/10/8ce310c6204c039c8ae55a63102c961b.jpg",

  

"created_at": "2019-11-05T14:48:45.268Z",

  

"updatedAt": "2019-11-05T14:48:45.268Z"

  

}

  

  

```

  

  

> UPDATE

  

  

- **URL**

  

`http://localhost:3000/articles/:id`

  

- **Method**

  

`PATCH`

  

- **Data Params**

  

(optional number of updated key) body :

  

| Property |Type |Description |

|----------------|-------------------------------|-----------------------------|

|`title`|string |user's article's title | 
|`content` |string |user's article's content |
|`image` |string |user's article's image |
|`tags` |string |user's article's tags |
  

  

  

- **Success Response :**

  

**code** : 200

  

**content example :**

  

  

```

  

{

  

"data": {

  

"tags": [

  

"womanhood",

  

"empowerment",

  

"change"

  

],

  

"_id": "5dc246e4a0a8ac0fdf6f64eb",

  

"title": "Women Empowerment : Wind of Changes Declaration",

  

"content": "Women empowerment has become the buzzword today with women working alongside men in all spheres. They profess an independent outlook, whether they are living inside their home or working outside. They are increasingly gaining control over their lives and taking their own decisions about their education, career, profession and lifestyle.",

  

"image": "https://i.pinimg.com/564x/f1/2e/f4/f12ef4f01a9281b222b438b191efd6fd.jpg",

  

"created_at": "2019-11-06T04:07:00.563Z",

  

"updatedAt": "2019-11-06T04:29:08.969Z"

  

},

  

"msg": "ok"

  

}

  

  

```