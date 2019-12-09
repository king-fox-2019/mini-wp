## Mini WordPress

#### User Register

- ##### url

  /register

- ##### Method

  `POST`

- ##### Required

  | Form     | input required |
  | -------- | -------------- |
  | Email    | [Email]        |
  | name     | [String]       |
  | Password | [String ]      |

- ##### Success Response:

  you will directed to the main page.

  ###### 	Code: 201

- ##### Error Response:

  - **Code:** 422 Unprocessable Entity

    **Content:** `{error: name is require}`or

    ​		  `{error: email is require}` or

    ​		  `{error: password is require}` 

  - **Code:** 409 Conflict

    **Content:** name or email has been used

- ##### Sample call:

  ```
  axios({
          url: "http://localhost:3000/register",
          method: "POST",
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
  ```

  ​

#### User login

- ##### url

  /login

- ##### Method

  `POST`

- ##### Required

  | Form     | input required |
  | -------- | -------------- |
  | Email    | [Email]        |
  | name     | [String]       |
  | Password | [String ]      |

- ##### Success Response

  will redirect/show to home page

  ###### Code: 200


- ##### Error Response: 

  - **Code:** 403 Forbidden

    **Content:** `{error: Password Incorrect}`

  - **Code:** 404 Not Found

    **Content:** `{error: Your username not match to any user's account }`

#### Google login

- ##### url

  /google-signin

- ##### Method

  `POST`

- ##### Success Response

  login via google account



### Article

#### Get All Article

- ##### url

  /article

- ##### Method

  `GET`

- ##### Success Response:

  Showing all article in array of object

  ```
  [
      {
          "featured_image": "asdasdasdasd",
          "_id": "5decf50e35b90a125105f85d",
          "title": "123",
          "content": "mari belajar berhitung",
          "author": {
              "_id": "5dec988fea40921ce2fea07e",
              "name": "putri"
          },
          "createdAt": "2019-12-08T13:05:18.487Z",
          "updatedAt": "2019-12-08T13:05:18.487Z",
          "__v": 0
      },
      {
          "featured_image": "https://storage.googleapis.com/andreas-												projects/1575818124537-images.png",
          "_id": "5ded138dfc91a62189d25d49",
          "title": "123",
          "content": "mari belajar berhitung",
          "author": {
              "_id": "5dec988fea40921ce2fea07e",
              "name": "putri"
          },
          "createdAt": "2019-12-08T15:15:25.935Z",
          "updatedAt": "2019-12-08T15:15:25.935Z",
          "__v": 0
      }
  ]
  ```

  ​

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error

#### Get Single Article

- ##### url

  /article/:id

- ##### Method

  `GET`

- ##### Success Response:

  Showing spesific article

  ```
  {
      "featured_image": "",
      "_id": "5decf4f535b90a125105f85c",
      "title": "123",
      "content": "mari belajar berhitung",
      "author": {
          "_id": "5dec988fea40921ce2fea07e",
          "name": "putri"
      },
      "createdAt": "2019-12-08T13:04:53.126Z",
      "updatedAt": "2019-12-08T13:04:53.126Z",
      "__v": 0
  }
  ```

  ​

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error

#### Post Article

- ##### url

  /article

- ##### Method

  `POST`

- ##### Require

  Login/Access_Token

- ##### Success Response:

  Article created, you can see on article list

  ```
  {
      "featured_image": "https://storage.googleapis.com/andreas-projects/1575865522513-images.png",
      "_id": "5dedccb987666e09ffd61dba",
      "title": "Node.JS",
      "content": "mari belajar ngoding",
      "author": "5dec988fea40921ce2fea07e",
      "createdAt": "2019-12-09T04:25:30.529Z",
      "updatedAt": "2019-12-09T04:25:30.529Z",
      "__v": 0
  }
  ```

  ​

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error

#### Delete Article

- ##### url

  /article/:id

- ##### Method

  `DELETE`

- ##### Require

  Login/Access_Token from article owner

- ##### Success Response:

  Article deleted

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error
  - **Code:** 403 Forbidden, -> trying delete article that not belong to you

#### Update Article

- ##### url

  /article/:id

- ##### Method

  `PUT`

- ##### Require

  Login/Access_Token from article owner

- ##### Success Response:

  Article updated

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error
  - **Code:** 403 Forbidden, -> trying updating article that not belong to you