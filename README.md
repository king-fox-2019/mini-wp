# MINI-WP

### ESY

## Routes

server: http://localhost:3000/<br>
client: http://localhost:1234/<br>
Access in deploy : http://mini-wp.edwinsatya.online/

Bellows are routes that used in the sever fancy-todo.js

- base routes ARTICLE url : http://localhost:3000/articles

  - POST : /

    - description : create new article
    - body :
      ```
      {
          title : String
          content : String
          create_at : Date
          image: String
          author: String
      }
      ```
    - Headers : JWT Token
    - Response :

      - Success :
        Status Code : 201
        ```
        {
            "_id": "5dcad3cd8e66c34e0b1c7b24",
            "title": "edwin",
            "content": "satya",
            "image": "https://storage.googleapis.com/edwin-bucket-96/1573573580171-foto.jpg",
            "author": "5dbe73ee9cf1542872c68cec",
            "create_at": 2019-11-12T15:46:21.143+00:00
        }
        ```
      - Error :
        Status Code : 500

        ```
        {"message" : "Internal Server Error"}
        ```

        Status Code : 401

        ```
        {
            "message": "Unauthorized user"
        }
        ```

  - GET : /

    - description : Get all of article user
    - body : none
    - Headers : JWT Token
    - Response :

      - Success :
        Status Code : 200
        ```
        {
            _id": "5dcad3cd8e66c34e0b1c7b24",
            "title": "edwin",
            "content": "satya",
            "image": "https://storage.googleapis.com/edwin-bucket-96/1573573580171-foto.jpg",
            "author": "5dbe73ee9cf1542872c68cec",
            "create_at": 2019-11-12T15:46:21.143+00:00
        }
        ```
      - Error :
        Status Code : 500

        ```
        {"message" : "Internal Server Error"}
        ```

        Status Code : 401

        ```
        {
            "message": "Unauthorized user"
        }
        ```

  - PUT : /:id

    - description : update data of a article
    - body : data that may want to be updated
      ```
      {
          title : String,
          content : String,
      }
      ```
    - params : article_id
    - Headers : JWT Token
    - Response :

      - Success :
        Status Code : 200
        ```
        {
            "message" : "succses update article"
        }
        ```
      - Error :
        Status Code : 500

        ```
        {"message" : "Internal Server Error"}
        ```

        Status Code : 401

        ```
        {
            "message": "Unauthorized user"
        }
        ```

  - DELETE /:id

    - description : delete a article
    - body : none
    - params : article_id
    - Headers : JWT Token
    - Response :

      - Success :
        Status Code : 200
        ```
        {
            "message" : "Success delete article"
        }
        ```
      - Error :
        Status Code : 500

        ```
        {"message" : "Internal Server Error"}
        ```

        Status Code : 401

        ```
        {
            "message": "Unauthorized user"
        }
        ```

- base routes USERS url : http://localhost:3000/users

  - POST : /register

    - description : create a new user
    - body :
      ```
          {
              name : String,
              email : String,
              password : String
          }
      ```
    - Headers : none
    - Response :
      - Success :
        Status Code : 201
        ```
        {
            "_id": "5dbf3cff9fde4d02bad97caf",
            "name": "karina",
            "email": "karina@gmail.com",
            "password": "$2a$10$rrpFvMcOj.nYGPA3EnV.puWXwa5DatjVwajcuRbpu.HPKE0NoTW/K",
            "__v": 0
        }
        ```
      - Error :
        Status Code : 500
        ```
        {"message" : "Internal Server Error"}
        ```

  - POST : /login

    - description : login to the system
    - body :
      ```
          {
              email : String,
              password : String
          }
      ```
    - Headers : none
    - Response :
      - Success :
        Status Code : 200
        ```
        {
            "token" : "hcsuacnsdhidzuSDHBGASVGAwdudasdsadas"
        }
        ```
      - Error :
        Status Code : 500
        ```
        {"message" : "Internal Server Error"}
        ```
        Status Code : 404
        ```
        {"message" : "Username/Password is wrong!"}
        ```

  - POST : /googleLogin
    - description : login to the system using google
    - body : Google OAuth Token
    - Headers : none
    - Response :
      - Success :
        Status Code : 200
        ```
        {
            "token" : "hcsuacnsdhidzuSDHBGASVGAwdudsadSDSD"
        }
        ```
      - Error :
        Status Code : 500
        ```
        {"message" : "Internal Server Error"}
        ```

## Usage

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ npm run dev
```

Make sure you have node js has been installed in your computer, then run the folder <b>client</b> the commands bellow in your terminal.

```
    $ parcel index.html
```

or visited my mini-wp

```
    in : http://mini-wp.edwinsatya.online/
```

## By : Edwin Satya Yudistira
