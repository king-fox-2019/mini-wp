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

  | Property                |Type                         |Description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string           |user's email        |
|`_id`          |string           |user's id          |
|`token`        |string|user's token|



  
  
  

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

  | Property                |Type                         |Description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string           |user's email        |
|`password`       |string           |user's passwords         |



  
  
  
  

- **Success Response :**

**code** : 200

**content example :**

  

```

{

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzhhMjkyZGRkMzRlMTc0MDY1OGQ4NyIsImVtYWlsIjoiYXVkcmV5QG1haWwuY29tIiwiaWF0IjoxNTczNDMwMDEwfQ.F9e3y6CaSYymP8PkToOMNve3WFp7cruZZy53Zf8S0-g"

}

  

```

  
  
  

# **Article**

  
  
  

> Read All Article

  

- **URL**

`http://localhost:3000/articles`

- **Method**

`GET`

- **Data Params :** none

  

- **Success Response :**

**code** : 200

**content example :**

  

```

[

{

"tags": [

"womanhood",

"power",

"priviledge"

],

"_id": "5dc24736a0a8ac0fdf6f64ec",

"title": "Power and Priviledge : Millennials Hate Phone Calls, And They Have A Point",

"content": "Millennials are the generation that grew up bridging the digital age. They’re the very last ones who will ever remember what it is like to grow up without the Internet, and are also the ones who have actively participated in making it such an integral part of everyday life.",

"imgSrc": "https://i.pinimg.com/564x/22/5f/5f/225f5ff4d2a09e28cbbc3814a1b2f3a4.jpg",

"created_at": "2019-11-06T04:08:22.223Z",

"updatedAt": "2019-11-06T04:08:22.223Z"

},

{

"tags": [

"womanhood",

"empowerment"

],

"_id": "5dc246e4a0a8ac0fdf6f64eb",

"title": "Women Empowerment : Wind of Change",

"content": "Women empowerment has become the buzzword today with women working alongside men in all spheres. They profess an independent outlook, whether they are living inside their home or working outside. They are increasingly gaining control over their lives and taking their own decisions about their education, career, profession and lifestyle.",

"imgSrc": "https://i.pinimg.com/564x/f1/2e/f4/f12ef4f01a9281b222b438b191efd6fd.jpg",

"created_at": "2019-11-06T04:07:00.563Z",

"updatedAt": "2019-11-06T04:07:00.563Z"

},

{

"tags": [

"womanhood",

"gender"

],

"_id": "5dc24605a0a8ac0fdf6f64ea",

"title": "The Gender Pay Gap for Women",

"content": "The gender pay gap or gender wage gap is the average difference between the remuneration for men and women who are working. Women are generally considered to be paid less than men. There are two distinct numbers regarding the pay gap: unadjusted versus adjusted pay gap.",

"imgSrc": "https://i.pinimg.com/564x/97/72/6d/97726d0e1039b5840282de6fb8fc1978.jpg",

"created_at": "2019-11-06T04:03:17.306Z",

"updatedAt": "2019-11-06T04:03:17.306Z"

},

{

"tags": [

"womanhood",

"pride"

],

"_id": "5dc18bcd4cf1c3399ad26088",

"title": "Body image, aging, and identity in women over 50: The Gender and Body Image (GABI) study",

"content": "We conducted a qualitative study of 1,849 women over age 50 to capture the thoughts, feelings, and attitudes that women at middle age have about their bodies and the experience of aging. Via an open-ended question online survey, four primary themes emerged: (a) the physical and psychological experience of aging; (b) the injustices, inequities, and challenges of aging; (c) the importance of self-care; and (d) a plea for recognition of the need to maintain a contributory role in society. Results highlight the complexities of women’s psychological and physical aspects of aging and point toward important topics worthy of further study in this growing population.",

"imgSrc": "https://i.pinimg.com/564x/8c/e3/10/8ce310c6204c039c8ae55a63102c961b.jpg",

"created_at": "2019-11-05T14:48:45.268Z",

"updatedAt": "2019-11-05T14:48:45.268Z"

},

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

"updatedAt": "2019-11-05T14:44:39.958Z"

}

]

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

"imgSrc": "https://i.pinimg.com/564x/a0/d6/7d/a0d67dfed2d6225fb22ebbd74cf6dce8.jpg",

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

  | Property                |Type                         |Description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string  |user's article's title, REQUIRED          |       |
|`content`       |string           |user's article's content, REQUIRED        |

  

  
  
  
  

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

"imgSrc": "https://i.pinimg.com/564x/8c/e3/10/8ce310c6204c039c8ae55a63102c961b.jpg",

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

  
  | Property                |Type                         |Description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string  |user's article's title, REQUIRED          |       |
|`tags`       |string           |user's article's tags, REQUIRED        |

  

   
  

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

"imgSrc": "https://i.pinimg.com/564x/f1/2e/f4/f12ef4f01a9281b222b438b191efd6fd.jpg",

"created_at": "2019-11-06T04:07:00.563Z",

"updatedAt": "2019-11-06T04:29:08.969Z"

},

"msg": "ok"

}

  

```