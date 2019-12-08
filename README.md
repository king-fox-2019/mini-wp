# Wordpress KW Documentation

**Wordpress KW** is a simple API that functions content management in your life. Wordpress KW is designed by express, Mongoose, and other packages. If you use this API then run `npm install` to install everything you need. You must install `nodemon` before trying to use.

## Base URL

Base URL of Wordpress KW is :

`http://localhost:<port>`

The port can be added to the .env file, we use port 3000 as the default.

## ENV Template

| Variable     | Data Type |
| ------------ | --------- |
| PORT         | number    |
| DBNAME       | string    |
| SECRET_KEY   | string    |
| CLIENT_ID    | string    |
| GCS_PATHFILE | string    |

## Register User

**Endpoint** : `/user/register`  

**Method** : `POST`  

**Request** :   

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    name    |  string   |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success 

  ```javascript
  {
      "token": <token : string>
  }
  ```

- Error

  1. ValidationError / ` 422`

     ```javascript
     {
         "errors": {
      ``       "email": {
                 "message": "Email is unavailable",
                 "name": "ValidatorError",
                 "properties": {
                     "msg": "Email is unavailable",
                     "message": "Email is unavailable",
                     "type": "user defined",
                     "path": "email",
                     "value": "example@mail.com"
                 },
                 "kind": "user defined",
                 "path": "email",
                 "value": "example@mail.com"
             }
         },
         "_message": "User validation failed",
         "message": "User validation failed: email: Email is unavailable",
         "name": "ValidationError"
     }
     ```



## Login User

**Endpoint** : `/user/login`  

**Method** : `POST`  

**Request** :   

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success 

  ```javascript
  {
      "token": <token : string>
  }
  ```

- Error

  1. User not found / `422`

     ```javascript
     {
         "message": "User not found"
     }
     ```

  2. Wrong Password / `422`

     ```javascript
     {
         "message": "Wrong password"
     }
     ```

     

## Create Article

**Endpoint** : `/articles`  

**Method** : `POST`  

**Request** :   

- Data Parameters

|   Parameters   |   Data Type   |
| :------------: | :-----------: |
|      name      |    string     |
|    content     | string / html |
| featured_image |    string     |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success 

    ```javascript
    {
      _id: <id : ObjectId>,
      title: 'Hello',
      content: 'I have some cake<div><img src="https://storage.googleapis.com/wordpresskw-bucket.syirilrakhulh.com/1575834111545-cake.jpg"><br></div>',
      author: <id : ObjectId>,
      featured_image: 'https://storage.googleapis.com/wordpresskw-bucket.syirilrakhulh.com/1575834125358-cake.jpg',
      createdAt: 2019-12-08T19:43:33.176Z,
      updatedAt: 2019-12-08T19:43:33.176Z
    }
    ```

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

    2. ValidationError / `422`

       ```javascript
       {
           "message": {
               "errors": {
                   "title": {
                       "message": "Title can't be empty",
                       "name": "ValidatorError",
                       "properties": {
                           "message": "Title can't be empty",
                           "type": "required",
                           "path": "title"
                       },
                       "kind": "required",
                       "path": "title"
                   },
                   "content": {
                       "message": "Content can't be empty",
                       "name": "ValidatorError",
                       "properties": {
                           "message": "Content can't be empty",
                           "type": "required",
                           "path": "content"
                       },
                       "kind": "required",
                       "path": "content"
                   }
               },
               "_message": "Article validation failed",
               "message": "Article validation failed: title: Title can't be empty, content: Content can't be empty",
               "name": "ValidationError"
           }
       }
       ```

  

## Read Article

**Endpoint** : `/articles  

**Method** : `GET`  

**Request** :   

- URL Parameters

|                  Parameters                   | Data Type |
| :-------------------------------------------: | :-------: |
|     any key according to the table field      |  string   |
| author (get from decoded header access token) | ObjectId  |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    [
      {
        _id: 5ded5265dbf2f639eea14997,
        title: 'Hello',
        content: 'I have some cake<div><img src="https://storage.googleapis.com/wordpresskw-bucket.syirilrakhulh.com/1575834111545-cake.jpg"><br></div>',
        author: {
          _id: 5debf09bd531ea436e12670d,
          name: 'Syiril',
          email: 'syirilrakhulhaqim@gmail.com',
          password: '$2a$10$l6Gf7Vou41lkeDB0rZIHBul1.5JKkjoOGs40bauM2dSc2m38lvvp.',
          createdAt: 2019-12-07T18:34:03.259Z,
          updatedAt: 2019-12-07T18:34:03.259Z
        },
        featured_image: 'https://storage.googleapis.com/wordpresskw-bucket.syirilrakhulh.com/1575834125358-cake.jpg',
        createdAt: 2019-12-08T19:43:33.176Z,
        updatedAt: 2019-12-08T19:43:33.176Z
      }
    ]
    
    ```

    *if articles does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       
       ```

  

## Update Article

**Endpoint** : `/articles/:id`  

**Method** : `PUT`  

**Request** :   

- URL Parameters

|   Parameters    | Data Type |
| :-------------: | :-------: |
| id (article id) | ObjectId  |

- Data Parameters

|   Parameters   |   Data Type   |
| :------------: | :-----------: |
|      name      |    string     |
|    content     | string / html |
| featured_image |    string     |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
      _id: 5ded3ab080863a15a4f9094e,
      title: 'Hello U',
      content: '<div>hi !</div>',
      author: 5debf09bd531ea436e12670d,
      createdAt: 2019-12-08T18:02:24.605Z,
      updatedAt: 2019-12-08T19:59:08.365Z
    }
    ```

    *return new data (updated)

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

    2. Error Forbidden / `403`

       ```javascript
       {
         name: 'JsonWebTokenError',
         message: 'jwt malformed'
       }
       ```

       

## Delete Article

**Endpoint** : `/articles/:id`  

**Method** : `DELETE`  

**Request** :   

- URL Parameters

|   Parameters    | Data Type |
| :-------------: | :-------: |
| id (article id) | ObjectId  |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
      lastErrorObject: { n: 1 },
      value: {
        _id: 5ded3ab080863a15a4f9094e,
        title: 'Hello U',
        content: '<div>hi !</div>',
        author: 5debf09bd531ea436e12670d,
        createdAt: 2019-12-08T18:02:24.605Z,
        updatedAt: 2019-12-08T19:59:08.365Z
      },
      ok: 1
    }
    
    ```

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       
       ```

    2. Article not found / `404`

       ```javascript
       {
           "Name": "NotFound",
           "Message": "Error not found"
       }
       
       ```

       

## Upload Image Article

**Endpoint** : `/articles/image`  

**Method** : `POST`  

**Request** :   

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    file    | Form Data |

- Response

  - Success / `200`

    ```javascript
    {
      file: 'https://storage.googleapis.com/wordpresskw-bucket.syirilrakhulh.com/1575836396241-cake.jpg'
    }
    ```

    