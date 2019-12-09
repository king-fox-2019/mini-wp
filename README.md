# mini-wp

//link deploy

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  None

- **Data Params**
  **Required:**

  `username=[string]` <br />
  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5ded0562af20c853a50195df",
            "username": "janedoe",
            "email": "jane@mail.com",
            "password": "$2a$10$gGIpUrYVpIRWnNreO4rQXOrSnipDQGZtC4ow9Knfb0XXPA9T.uykC",
            "createdAt": "2019-12-08T14:14:58.792Z",
            "updatedAt": "2019-12-08T14:14:58.792Z",
            "image": "https://storage.googleapis.com/miniwp_alvina/1575841952268pexels-photo-414171.jpeg",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "email/username already registered" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  None

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWQwNTYyYWYyMGM4NTNhNTAxOTVkZiIsImVtYWlsIjoiamFuZUBtYWlsLmNvbSIsImlhdCI6MTU3NTgxNDYyNCwiZXhwIjoxNTc1ODE1MjI0fQ.Qx6N4lxiULd29YA-phAS1q0n1BpPTSfve0Zv0jzk9hk";
    ```

- **Error Response:**
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Read all user's articles**

- **URL**
  <_/articles_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
      {
        _id: "5deb2c2e1a46214a0da2d6c6",
        tags: ["travel", "india"],
        title: "Trip to Ladakh",
        content:
          "My trip to Ladakh was a long awaited one. And Bollywood movies only added fuel to the fire (enchanting scenes from 3 Idiots and Jab Tak Hai Jaan). So in the first week of May, I finally got the opportunity to travel to Ladakh – a trip that has given me memories worth a lifetime, a trip that has permanently inscribed startling sights of this enchanting place in my mind!",
        UserId: "5deb29db9aa45e44ce1ca196",
        image:
          "https://storage.googleapis.com/miniwp_alvina/1575841952268pexels-photo-414171.jpeg",
        createdAt: "2019-12-07T04:35:58.199Z",
        updatedAt: "2019-12-07T04:35:58.199Z",
        __v: 0
      },
      {
        _id: "7ghb1c2e1c46214akd12hv6c6",
        tags: ["travel", "vietnam"],
        title: "Trip to Sapa",
        content: "My trip to Sapa was a long awaited one....",
        UserId: "5deb29db9aa45e44ce1ca196",
        image:
          "https://storage.googleapis.com/miniwp_alvina/1575841952268pexels-photo-414171.jpeg",
        createdAt: "2019-12-07T04:35:58.199Z",
        updatedAt: "2019-12-07T04:35:58.199Z",
        __v: 0
      }
    ];
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "unauthorized" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Read an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
        _id: "5deb2c2e1a46214a0da2d6c6",
        tags: ["travel", "india"],
        title: "Trip to Ladakh",
        content:
          "My trip to Ladakh was a long awaited one. And Bollywood movies only added fuel to the fire (enchanting scenes from 3 Idiots and Jab Tak Hai Jaan). So in the first week of May, I finally got the opportunity to travel to Ladakh – a trip that has given me memories worth a lifetime, a trip that has permanently inscribed startling sights of this enchanting place in my mind!",
        UserId: "5deb29db9aa45e44ce1ca196",
        "image": "https://storage.googleapis.com/miniwp_alvina/1575841952268pexels-photo-414171.jpeg",
        createdAt: "2019-12-07T04:35:58.199Z",
        updatedAt: "2019-12-07T04:35:58.199Z",
        __v: 0
      }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "unauthorized" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Create an article**

- **URL**
  <_/articles_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params**
  **Required:**
  `title=[string]` <br />
  `tags=[string]` <br />
  `image=[file]` <br />
  `content=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
        _id: "5deb2c2e1a46214a0da2d6c6",
        tags: ["travel", "india"],
        title: "Trip to Ladakh",
        content:
          "My trip to Ladakh was a long awaited one. And Bollywood movies only added fuel to the fire (enchanting scenes from 3 Idiots and Jab Tak Hai Jaan). So in the first week of May, I finally got the opportunity to travel to Ladakh – a trip that has given me memories worth a lifetime, a trip that has permanently inscribed startling sights of this enchanting place in my mind!",
        UserId: "5deb29db9aa45e44ce1ca196",
        createdAt: "2019-12-07T04:35:58.199Z",
        updatedAt: "2019-12-07T04:35:58.199Z",
        __v: 0
      }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "unauthorized" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "message": "Article successfully deleted."
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "unauthorized" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `title=[string]` <br />
  `tags=[string]` <br />
  `image=[file]` <br />
  `content=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
        _id: "5deb2c2e1a46214a0da2d6c6",
        tags: ["travel", "india"],
        title: "Trip to Ladakh and Kashmir",
        content:
          "My trip to Ladakh was a long awaited one. And Bollywood movies only added fuel to the fire (enchanting scenes from 3 Idiots and Jab Tak Hai Jaan). So in the first week of May, I finally got the opportunity to travel to Ladakh – a trip that has given me memories worth a lifetime, a trip that has permanently inscribed startling sights of this enchanting place in my mind!",
        UserId: "5deb29db9aa45e44ce1ca196",
        "image": "https://storage.googleapis.com/miniwp_alvina/1575841952268pexels-photo-414171.jpeg",
        createdAt: "2019-12-07T04:35:58.199Z",
        updatedAt: "2019-12-07T04:35:58.199Z",
        __v: 0
      }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "unauthorized" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`
