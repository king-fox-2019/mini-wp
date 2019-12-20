# mini-wp

**Base URL:**




**User routes:**

| **Route**           | **METHOD** | **Description**                        

| /users/login        | POST       | Sign in user                           
| /users/register     | POST       | Sign up new user                       
| /users/loginGoogle  | POST       | Sign in using OAuth 2.0 Google         

**Articles routes:**

| Routes        | Method | Description                   |
|---------------|--------|-------------------------------|
| /articles     | GET    | get all article               |
| /article/:id  | GET    | get one article by id         |
| /articles     | POST   | create new article            | 
| /articles/:id | DELETE | delete article by ID          | 
| /articles/:id | PUT    | update article by ID          |
| /articles/:id | PATCH  | update colomn star at article | 


**Errors:**

| Code | Name                  | Description                  |
|------|-----------------------|------------------------------|
| 400  | CastError             | id invalid                   |
| 400  | JsonWebTokenError     | invalid token                |
| 400  | ValidationError       | validation on model is false |
| 500  | Internal server error | error by server              |

## **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `name = [string]`
    - `email = [string],[unique]`
    - `password = [string][min length 6]`
    - `phoneNumber = [string]`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
      {
    "message": "login succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZWRjN2U5MjEwZDE4NmVjNTAyZmM2MiIsIm5hbWUiOiJyZW55IiwiZW1haWwiOiJyZW55QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUWI3bENiQmFlUDJEZ2ZiWUtTUFdrdVVFMFBCL0hCaXdlSVlXelNFMjVtcXYxc2V4MHJXd08iLCJwaG9uZU51bWJlciI6Iis2Mjg5NjA2NzAzMDk0IiwiX192IjowfSwiaWF0IjoxNTc1ODY0Mjk4fQ.mQLMZHkCjl6nSQeXqeL-u2oCJy6BayBAeVenRD1gZMM",
    "user": {
        "email": "user@mail.com",
        "_id": "5dedc7e9210d186ec502fc62",
        "name": "user"
    }
}
    ```

- **Error Response:**

  - **Status:** `400` **Content:**

    ```
       {
    "message": [
        "email already registered"
    ]
}
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
        url: "http://localhost:3000/users/register",
        method: "POST",
        data: {
          name: this.name,  
          email: this.email,
          password: this.password,
          username: this.username,
          phoneNumber: this.phone
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
    "message": "login succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZWI0N2Q2OWEwMDZlM2NkYTdlOGUzNyIsIm5hbWUiOiJkYW5pZWwiLCJlbWFpbCI6ImRhbmlAbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRVd2JiRFNENWs5YnpvOEVURi5uUHJ1Nk9wa1dTcURDbmpwWnouQi9Fa3lxRHdvSkFhcDJIUyIsInBob25lTnVtYmVyIjoiKzYyODk2MDY3MDMwOTQiLCJfX3YiOjB9LCJpYXQiOjE1NzU4NjQ2MzV9.QbrZFu-iBJRGQlJEsH-OopH5PDuixZHnMLMqOBefjK8",
    "user": {
        "email": "user@mail.com",
        "_id": "5deb47d69a006e3cda7e8e37",
        "name": "user"
    }
}
    ```

- **Error Response:**

    - **Status:** `403` **Content:**

        ```
        {
        "message": "Wrong Password"
        }
        ```
    - **Status:** `404` **Content:**

        ```
        {
        "message": "user not found"
        }
        ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
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

- **URL:** `/articles`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `title = [string]`
    - `content = [string]`
  - Optional :
    - `image = file`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
   {
    "_id": "5dedca2464df770154dcfcfb",
    "title": "test",
    "content": "test",
    "author": "user",
    "created_at": "2019-12-09T04:14:28.897Z",
    "star": false,
    "img": "https://storage.googleapis.com/andreas-projects/1575864866479-WhatsApp Image 2019-10-24 at 14.17.32.jpeg",
    "user_id": "5deb47d69a006e3cda7e8e37",
    "__v": 0
}
    ```

- **Error Response:**

  - **Status:** `400` **Content:**

    ```
    {
    "message": ["you must enter your title"]
    }
    ```

**Sample call:**

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

- **URL:** `/articles`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** `none`

- **URL Headers:** 

  - Required :
    - `token = access_token`


- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    [
            {
        "_id": "5deb5489adb8364760eb4b16",
        "title": "test1",
        "content": "<p>test</p>",
        "author": "user1",
        "created_at": "2019-12-07T07:28:09.405Z",
        "star": false,
        "img": "",
        "__v": 0
    },
    {
        "_id": "5ded1238e7ea7436b9884912",
        "title": "test2",
        "content": "<p><em><u>test2</u></em><u>coba</u><strong><u>test2</u></strong></p>",
        "author": "user1",
        "created_at": "2019-12-08T15:09:44.953Z",
        "star": false,
        "img": "https://storage.googleapis.com/andreas-projects/1575817783579-WhatsApp Image 2019-10-24 at 14.17.32.jpeg",
        "user_id": "5deb47d69a006e3cda7e8e37",
        "__v": 0
    },
    {
        "_id": "5dedca2464df770154dcfcfb",
        "title": "test",
        "content": "test",
        "author": "user",
        "created_at": "2019-12-09T04:14:28.897Z",
        "star": false,
        "img": "https://storage.googleapis.com/andreas-projects/1575864866479-WhatsApp Image 2019-10-24 at 14.17.32.jpeg",
        "user_id": "5deb47d69a006e3cda7e8e37",
        "__v": 0
    }
    ]
    ```

- **Error Response:**

  - **Status:** `400` **Content:**

    ```
    {
        "message": "invalid token, please don't change the token in your local storage"
    }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            methods : 'get',
            url: '/articles'
          })
    ```
