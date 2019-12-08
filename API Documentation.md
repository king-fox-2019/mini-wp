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

  Showing all article

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