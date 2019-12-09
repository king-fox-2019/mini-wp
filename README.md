# myMiniWordpress

------

**Base URL:**

https://perspective.afifahrahmak.site


**User routes:**

| **Route**           | **METHOD** | **Description**                        |
| :------------------ | :--------- | :------------------------------------- |
| /users/myprofile    | GET        | Get a user details                     |
| /users/mybookmark   | GET        | Get all bookmarked article from a user |
| /users/mydraft      | GET        | Get all drafts article from a user     |
| /users/login        | POST       | Sign in user                           |
| /users/register     | POST       | Sign up new user                       |
| /users/googleLogin  | POST       | Sign in using OAuth 2.0 Google         |

**Articles routes:**

| **Route**                           | **HTTP** | **Description**                             |
| :---------------------------------- | :------- | :------------------------------------------ |
| /articles/posted                    | GET      | Get all posted articles                     |
| /articles/draft/                    | GET      | Get all drafted articles from a user        |
| /articles/:articleId                | GET      | Get an article details                      |
| /articles/slug/:slug                | GET      | Get an article by slug                      |
| /articles/add                       | POST     | Create new article                          |
| /articles/addDraft                  | POST     | Create new drafted article                  |
| /articles/remove/:articleId         | DELETE   | Delete an article                           |
| /articles/addbookmark/:articleId    | PATCH    | Bookmark an article                         |
| /articles/removebookmark/:articleId | PATCH    | Remove an article from user's bookmark list |
| /articles/:articleId                | PATCH    | Update an article                           |

**Errors:**

| Code | Name                  | Description                                         |
| :--- | :-------------------- | :-------------------------------------------------- |
| 400  | Bad Request           | Invalid user's submitted data                       |
| 403  | Forbidden             | User not authorize to perform an action             |
| 404  | Not Found             | The requested resource could not be found           |
| 409  | Conflict              | Request could not be completed due to conflict data |
| 500  | Internal Server Error | We had a problem with our server                    |

## **Find User**

- **URL:** `/users/myprofile`

- **Method:** `GET`

- **URL Params:** none

- **URL Headers:** 

  - Required :
    - `token = [access_token]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
        {
            "id": 1,
            "email": "user@user.com",
            "username": "user",
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "articles" : [],
            "loginBy" : "web",
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'User not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
            url: `/users/myprofile`,
            methods: "get",
            headers: {
              token
            }
          })
    ```

## **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `username = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
        {
             "id": 1,
            "email": "user@user.com",
            "username": "user",
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "articles" : [],
            "loginBy" : "web",
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    ```

- **Error Response:**

  - **Status:** `409` **Content:**

    ```
        {
            "message": 'Email already in registered'
        }
    ```
  
- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/register',
            data : {
              username : this.usernameRegister,
              email : this.emailRegister,
              password : this.passwordRegister,
            }
          })
    ```

## 

## **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs",
        "name": "user",
        "email" : "user@user.com"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
      {
            "message": 'Email/password wrong'
      }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/login',
            data : {
              email : this.email,
              password : this.password,
            }
          })
    ```

## **Login Using Google OAuth**

- **URL:** `/users/googleLogin`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `token = [id_token Google]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs",
        "name": "user",
        "email" : "user@user.com"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You've been signin with github'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
              url : '/users/googleLogin',
              method : 'post',
              data : {
                id_token
              }
            })
    ```


## **Post New Article**

- **URL:** `/articles/add`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `title = [string]`
    - `content = [string]`
  - Optional :
    - `tags = [array]`
    - `image = file`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        tags: [
        "Node js",
        "Javascript"
        ],
        draft: true,
        _id: "5dc8532b25850d0da577ef31",
        title: "Node.js 12 to LTS and Node.js 13 is here!",
        content: "<p id="bd26" class="fu fv ar bj fw b fx fy fz ga gb gc gd ge gf gg gh" style="box-sizing: inherit; margin: 2em 0px -0.46em; color: rgba(0, 0, 0, 0.84); line-height: 1.58; letter-spacing: -0.004em; font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 21px; background-color: #ffffff;" data-selectable-paragraph="">We are excited to announce that Node.js 12 was promoted to Long T\ration-line: none; -webkit-tap-highlight-color: transparent; background-repeat: repeat-x; background-size: 1px 1px; background-position: 0px calc(1em + 1px);" target="_blank" rel="noopener nofollow">here</a>.</p> <p>&nbsp;</p>",
        image: "https://storage.googleapis.com/generalbucket.afifahrahmak.site/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        slug: "Node.js-12-to-LTS-and-Node.js-13-is-here!",
        __v: 0
    }
    ```

- **Error Response:**

  - **Status:** `400` **Content:**

    ```
        {
            "message": 'Title is required'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method : 'post',
            url : '/articles/add',
            data : formData,
            headers : {
              token,
              'Content-Type': 'multipart/form-data'
            }
          })
    ```



## **Get All Posted Articles**

- **URL:** `/articles/posted`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    [
      {
        tags: [
        "Node js",
        "Javascript"
        ],
        draft: false,
        _id: "5dc8532b25850d0da577ef31",
        title: "Node.js 12 to LTS and Node.js 13 is here!",
        content: "<p id="bd26" class="fu fv ar bj fw b fx fy fz ga gb gc gd ge gf gg gh" style="box-sizing: inherit; margin: 2em 0px -0.46em; color: rgba(0, 0, 0, 0.84); line-height: 1.58; letter-spacing: -0.004em; font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 21px; background-color: #ffffff;" data-selectable-paragraph="">We are excited to announce that Node.js 12 was promoted to Long T\ration-line: none; -webkit-tap-highlight-color: transparent; target="_blank" rel="noopener nofollow">here</a>.</p> <p>&nbsp;</p>",
        userId: {
            articles: [
            "5dc8532b25850d0da577ef31"
            ],
            loginBy: "github",
            bookmarks: [
            "5dc8532b25850d0da577ef31",
            "5dc851e725850d0da577ef2f"
            ],
            _id: "5dc852b125850d0da577ef30",
            username: "nadhiljanitra",
            email: "nadhiljanitraa@gmail.com",
            password: "$2a$10$aIwio0cvLA017bJNczmpOe8wDrREtFVIQeC7npPdcZN5mSwD6A0XS",
            createdAt: "2019-11-10T18:10:57.880Z",
            updatedAt: "2019-11-10T18:45:09.694Z",
            __v: 0
        },
        image: "https://storage.googleapis.com/generalbucket.afifahrahmak.site/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        slug: "Node.js-12-to-LTS-and-Node.js-13-is-here!",
        __v: 0
      },
      {
        tags: [
        "angular",
        "javascript"
        ],
        draft: false,
        _id: "5dc851e725850d0da577ef2f",
        title: "Installing Angular with Angular-CLI in a Couple of Minutes (updated)",
        content: "<section class="fb fc fd fe ff" style="box-sizing: inherit; word-break: break-word; overflow-wrap: break-word;" inherit; font-weight: bold;">Angular CLI&nbsp;</span>on your machine, it takes only a couple of minutes to install &amp; run an Angular project. I hope you find this article useful.</p> </div> </div> </section> <p>&nbsp;</p> </div> </div> </section>",
        userId: {
            articles: [
            "5dc851e725850d0da577ef2f"
            ],
            loginBy: "web",
            bookmarks: [ ],
            _id: "5dc8505125850d0da577ef2e",
            username: "user",
            email: "user@user.com",
            password: "$2a$10$aIwio0cvLA017bJNczmpOezXmF2w7jshX9JcTKqrRIg7qfqkRsBZ2",
            createdAt: "2019-11-10T18:00:49.961Z",
            updatedAt: "2019-11-10T18:08:47.018Z",
            __v: 0
            },
        image: "https://storage.googleapis.com/generalbucket.afifahrahmak.site/15734092553090_bGo_CxWAPXgEFbsh.jpeg",
        createdAt: "2019-11-10T18:07:36.128Z",
        updatedAt: "2019-11-10T18:09:18.773Z",
        slug: "Installing-Angular-with-Angular-CLI-in-a-Couple-of-Minutes",
        __v: 0
        }
    ]
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Users not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            methods : 'get',
            url: '/articles/posted'
          })
    ```

## **Get All Drafted Articles From a User**

- **URL:** `/articles/draft`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** `none`

- **URL Headers:** 

  - Required :
    - `token = [access_token]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
     {
            "id": 1,
            "email": "user@user.com",
            "username": "user",
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "articles" : [{
                tags: [
                "Node js",
                "Javascript"
                ],
                draft: true,
                _id: "5dc8532b25850d0da577ef31",
                title: "Node.js 12 to LTS and Node.js 13 is here!",
                content: "<p id="bd26" class="fu fv ar bj fw b fx fy fz ga gb gc gd ge gf gg gh" style="box-sizing: inherit; margin: 2em 0px -0.46em; color: rgba(0, 0, 0, 0.84); line-height: 1.58; letter-spacing: -0.004em; font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 21px; background-color: #ffffff;" data-selectable-paragraph="">We are excited to announce that Node.js 12 was promoted to Long T\ration-line: none; -webkit-tap-highlight-color: transparent; target="_blank" rel="noopener nofollow">here</a>.</p> <p>&nbsp;</p>",
                image: "https://storage.googleapis.com/generalbucket.afifahrahmak.site/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
                createdAt: "2019-11-10T18:12:59.664Z",
                updatedAt: "2019-11-10T18:13:21.289Z",
                slug: "Node.js-12-to-LTS-and-Node.js-13-is-here!",
                __v: 0
            }],
        "loginBy" : "web",
        "updatedAt": "2019-10-29T15:21:41.639Z",
        "createdAt": "2019-10-29T15:21:41.639Z"
    }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Draft articles not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            url: `/articles/draft`,
            methods: "get",
            headers: {
              token
            }
          })
    ```

## **Remove an Article**

- **URL:** `/articles/remove/:articleId`

- **Method:** `DELETE`

- **URL Params:** 

  - Required :
    - `articleId = [string]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        message : 'article deleted'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
            method : 'delete',
            url : `/articles/remove/${articleId}`,
            headers : {
              token : localStorage.getItem('token')
            }
          })
    ```

## **Update an Article**

- **URL:** `/articles/:articleId`
- **Method:** `PATCH`
- **URL Params:** 
  - Required :
    - `articleId = [string]`
- **URL Headers:** 
  - Required :
    - `token = access_token`

- **Data Params:** 
  - Required :
    - `title = [string]`
    - `content = [string]`
  - Optional :
    - `tags = [array]`
    - `image = file`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        message : 'article updated'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
            method : 'patch',
            url : `/articles/${articleId}`,
            data : formData,
            headers : {
              token,
              'Content-Type': 'multipart/form-data'
            }
          })
    ```

## **Add Article Into Bookmark List**

- **URL:** `/articles/addbookmark/:articleId`
- **Method:** `PATCH`
- **URL Params:** 
  - Required :
    - `articleId = [string]`
- **URL Headers:** 
  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        message : 'user updated'
    }
    ```

- **Error Response:**

  - **Status:** `409` **Content:**

    ```
        {
            "message": 'You've bookmarked this article'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
        axios({
            url : `/articles/addbookmark/${articleId}`,
            method : 'patch',
            headers : {
              token : localStorage.getItem('token')
            }
          })
    ```
