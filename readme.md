# MINI WORDPRESS

## **Register User**

Returns json data about newly register user.

- **URL**

  /user/register

- **Method:**

  `POST`

- **Data Params**

  &nbsp; username: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

- **Success Response:**

  - **Code:** 201 <br />

    ```javascript
        {
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "password",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />

    ```javascript
    {
        "error": "ValidationError",
        "message": "User validation failed: name: Path `name` is required., email: Path `email` is      required., password: Path `password` is required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/register`,
        method: `post`,
        data: {
            name: Username,
            email: user@email.com,
            password: `password`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Google Sign In**

Returns access token.

- **URL**

  /user/googleSignIn

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 201 <br />

    ```javascript
        {
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "password",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />

   ```javascript 
    {   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMjM5Nzl9.YbHSsgEs84-KLr9sVH-ZAWhkwvlZ5BUEm8-EpMpZmso"}
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/googleSignIn`,
        method: `post`,
        data: {
            token:id_token
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Login User**

Returns access token.

- **URL**

  /users/login

- **Method:**

  `POST`

- **Data Params**

  email: STRING
  password: STRING

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    {   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMjM5Nzl9.YbHSsgEs84-KLr9sVH-ZAWhkwvlZ5BUEm8-EpMpZmso"}
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "404",
        "message": "user not found"
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/login`,
        method: `post`,
        data: {
            email: email@mail.com
            password: secret
        }
    })
  ```

## **Get Articles**

Returns article data.

- **URL**

  /article

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
   [
    {
        "_id": "5ded1e3947184c07d6b62f48",
        "title": "Halo",
        "content": "Ini artikel pertama",
        "author": "richardkhonan",
        "featured_image": "https://storage.googleapis.com/mini_wordpress/1575820856735-crud1.png",
        "userId": "5ded1e1147184c07d6b62f47",
        "created_at": "2019-12-08T16:00:57.407Z",
        "__v": 0
    },
    {
        "_id": "5ded3234d2eb8b100b273e5f",
        "title": "Halo 2",
        "content": "Ini artikel ke-2",
        "author": "Richard Khonan",
        "featured_image": "https://storage.googleapis.com/mini_wordpress/1575825971551-error2.png",
        "userId": "5ded31ade2b9b70f761f81e3",
        "created_at": "2019-12-08T17:26:12.255Z",
        "__v": 0
    }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/article`,
        method: `get`
    })
  ```

  ## **Get user's articles**

Returns list of user's articles.

- **URL**

  /article/user

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
            "_id": "5ded1e3947184c07d6b62f48",
            "title": "Halo",
            "content": "Ini artikel pertama",
            "author": "richardkhonan",
            "featured_image": "https://storage.googleapis.com/mini_wordpress/1575820856735-crud1.png",
            "userId": "5ded1e1147184c07d6b62f47",
            "created_at": "2019-12-08T16:00:57.407Z",
            "__v": 0
        },
        {
            "_id": "5ded3234d2eb8b100b273e5f",
            "title": "Halo 2",
            "content": "Ini artikel ke-2",
            "author": "Richard Khonan",
            "featured_image": "https://storage.googleapis.com/mini_wordpress/1575825971551-error2.png",
            "userId": "5ded31ade2b9b70f761f81e3",
            "created_at": "2019-12-08T17:26:12.255Z",
            "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/article/user`,
        method: `get`,
        header:{access_token}
    })
  ```

    ## **Delete Article**

Delete an artile.

- **URL**

  /article

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        method:"delete",
        url:`http://localhost:3000/article`,
        data:{id},
        headers:{access_token}
    })
  ```

## **Create Article**

Create a new article.

- **URL**

  /article

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
   {
        "_id": "5ded1e3947184c07d6b62f48",
        "title": "Halo",
        "content": "Ini artikel pertama",
        "author": "richardkhonan",
        "featured_image": "https://storage.googleapis.com/mini_wordpress/1575820856735-crud1.png",
        "userId": "5ded1e1147184c07d6b62f47",
        "created_at": "2019-12-08T16:00:57.407Z",
        "__v": 0
    }
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "ValidationError",
        "message": "Article validation failed: name: Path `name` is required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        method: "post",
        url: "http://localhost:3000/article",
        data: {
          title,
          content,
          featured_image
        }
      })
  ```

  ## **Update Todo**

Update an article.

- **URL**

  /article

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/article",
          data:{
              title,
              content,
              featured_image
          }
      })
  ```