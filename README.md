# Fancy Todo



| Success Response | Message |
| :--------------- | ------- |
| 201              | Created |
| 200              | OK      |

| Error Response | Message               |
| -------------- | --------------------- |
| 400            | Bad Request           |
| 401            | Unauthorized          |
| 404            | Not Found             |
| 409            | Conflict              |
| 422            | Unprocessable Entity  |
| 500            | Internal Server Error |



#### Register User

* **URL**
  <_/users/signup_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > name=[string]
    >
    > email=[string]
    >
    > password=[string]

    

* **Success Response**

  * 201 Created

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGI3ZmYyMzljNzhjMGY5ZTA1ZDBmZSIsImVtYWlsIjoiYW5nZWxhQG1haWwuY29tIiwiaWF0IjoxNTc0NjY4MDgxfQ.aKFh1WzcLFt8sWc11_lIi1FsQNXvv80Cpxrqy5L5xNM",
        "name": "Angela Vanessa",
        "email": "angela@mail.com"
    }
    ```
  
* **Error Response**

  * 422 Unprocessable Entity

    ```javascript
    {
        "message": [
            "Name can not be empty",
            "Email can not be empty",
            "Password can not be empty"
        ]
    }
    ```

  * 400 Bad Request

    ```javascript
    {
        "message": "Email user is already registered!"
    }
    ```

#### Login User

* **URL**
  <_/users/signin_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > email=[string]
    >
    > password=[string]

  

* **Success Response**

  * 200 OK

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGI3ZmYyMzljNzhjMGY5ZTA1ZDBmZSIsImVtYWlsIjoiYW5nZWxhQG1haWwuY29tIiwiaWF0IjoxNTc0NjY4MDgxfQ.aKFh1WzcLFt8sWc11_lIi1FsQNXvv80Cpxrqy5L5xNM",
        "name": "Angela Vanessa",
        "email": "angela@mail.com"
    }
    ```

#### Create Article

* **URL**
  <_/articles_>

* **Method:**
  `POST` 

* **URL Params:**

  `Authorization`: `string`

* **Data Params:**

  * Required

    > title=[string]
    >
    > content=[string]
    
  * Optional

    ​	tags=[array]

* **Success Response**

  * 201 Created

    ```javascript
    {
        "tags": [
          	"postman"
        ],
        "trashStatus": false,
        "_id": "5ded073b0a70f77bd1d1c716",
        "title": "article dari postman",
        "content": "<p>bla bla bla bla</p><p><img src=\\\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\\\"></p>",
        "user": "5de4da02fd9b063fc155f852",
        "createdAt": "2019-12-08T14:22:51.618Z",
        "updatedAt": "2019-12-08T14:22:51.618Z",
        "slug": "article-dari-postman",
        "__v": 0
    }
    ```


#### Show One Article

* **URL**
  <_/articles/id_>

* **Method:**
  `GET` 

* **Headers:**

  `Authorization`: `string`

* **Success Response**

  * 200 OK

    ```javascript
        {
            "tags": [
                "macarons",
                "cakes",
                "sweets"
            ],
            "trashStatus": false,
            "_id": "5de63b7ca6081c92eb45767c",
            "title": "Artikel Keren",
            "content": "<p>This is salted caramel macaron</p><p><img src=\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\"></p>",
            "user": "5de4da02fd9b063fc155f852",
            "createdAt": "2019-12-03T10:39:56.973Z",
            "updatedAt": "2019-12-04T11:00:10.442Z",
            "slug": "artikel-keren",
            "__v": 0
        }
    ```

* **Error Response**

  * 401 Unauthorized

    ```javascript
    {
        "name": "JsonWebTokenError",
        "message": "jwt must be provided"
    }
    ```


#### Get All Articles

* **URL**
  <_/articles_>

* **Method:**
  `GET` 

* **Headers:**

  `Authorization`: `string`

* **Params:**

  `trash`: `boolean`

* **Success Response**

  * 200 OK

    ```javascript
    [
        {
            "tags": [
                "macarons",
                "cakes",
                "sweets"
            ],
            "trashStatus": false,
            "_id": "5de63b7ca6081c92eb45767c",
            "title": "Artikel Keren",
            "content": "<p>This is salted caramel macaron</p><p><img src=\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\"></p>",
            "user": "5de4da02fd9b063fc155f852",
            "createdAt": "2019-12-03T10:39:56.973Z",
            "updatedAt": "2019-12-04T11:00:10.442Z",
            "slug": "artikel-keren",
            "__v": 0
        },
        {
            "tags": [
                "kopi",
                "marlboro",
                "mantabuuu"
            ],
            "trashStatus": true,
            "_id": "5decf123070b1463716147af",
            "title": "Kopi memang terbaik",
            "content": "<p>kopi nikmat, apalagi dengan marlboro.</p><p><img src=\"https://storage.googleapis.com/miniwpmedia/1575809305627-m-salted-caramel.jpeg\"></p>",
            "user": "5de4da02fd9b063fc155f852",
            "createdAt": "2019-12-08T12:48:35.049Z",
            "updatedAt": "2019-12-08T12:48:35.049Z",
            "slug": "kopi-memang-terbaik",
            "__v": 0
        }
    ]
    ```


#### 

#### Update Article

- **URL** <*/articles/id_*>

- **Method:** `PUT` 

- **URL Params:**

  `Authorization`: `string`

- **Data Params:**

  - Required

    > title=[string]
    >
    > content=[string]

    

  - Optional

    ​	tags=[array]

- **Success Response**

  - 200 OK

    ```javascript
    {
        "tags": [
          	"postman"
        ],
        "trashStatus": false,
        "_id": "5ded073b0a70f77bd1d1c716",
        "title": "article dari postman updated",
        "content": "<p>bla bla bla bla</p><p><img src=\\\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\\\"></p>",
        "user": "5de4da02fd9b063fc155f852",
        "createdAt": "2019-12-08T14:22:51.618Z",
        "updatedAt": "2019-12-08T14:22:51.618Z",
        "slug": "article-dari-postman",
        "__v": 0
    }
    ```

    

#### Update Article Trash Status

- **URL** <*/articles/id_*>

- **Method:** `PATCH` 

- **URL Params:**

  `Authorization`: `string`

- **Data Params:**

  - Required

    > trash=[boolean]

- **Success Response**

  ```javascript
  {
      "tags": [
        	"postman"
      ],
      "trashStatus": true,
      "_id": "5ded073b0a70f77bd1d1c716",
      "title": "article dari postman updated",
      "content": "<p>bla bla bla bla</p><p><img src=\\\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\\\"></p>",
      "user": "5de4da02fd9b063fc155f852",
      "createdAt": "2019-12-08T14:22:51.618Z",
      "updatedAt": "2019-12-08T14:22:51.618Z",
      "slug": "article-dari-postman",
      "__v": 0
  }
  ```

- **Error Response**

  - 400 Bad Request

  ```javascript
  {
      "message": "Trash status is required"
  }
  ```

  

#### Delete Article

- **URL** <*/articles/id_*>

- **Method:** `DELETE` 

- **URL Params:**

  `Authorization`: `string`

- **Success Response**

  - 200 OK

    ```javascript
    {
        "tags": [
          	"postman"
        ],
        "trashStatus": true,
        "_id": "5ded073b0a70f77bd1d1c716",
        "title": "article dari postman updated",
        "content": "<p>bla bla bla bla</p><p><img src=\\\"https://storage.googleapis.com/miniwpmedia/1575369578087-m-salted-caramel.jpeg\\\"></p>",
        "user": "5de4da02fd9b063fc155f852",
        "createdAt": "2019-12-08T14:22:51.618Z",
        "updatedAt": "2019-12-08T14:22:51.618Z",
        "slug": "article-dari-postman",
        "__v": 0
    }
    ```

    

#### Upload Image for Article

- **URL** <*/articles/uploader_*>

- **Method:** `POST` 

- **URL Params:**

  `Authorization`: `string`

- **Data Params:**

  - Required

    > image=[file]

- **Success Response**

  - 200 OK

    ```javascript
    {
        "image": "https://storage.googleapis.com/miniwpmedia/1575816949726-cake1.jpg"
    }
    ```

    