# Readiant API Documentation

## **A. User Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /users/register | POST | None | name: string, email: string, password: string |
| /users/login    | POST | None | email: string, password: string |
| /users/googleSignIn | POST | googleidtoken: string | None |
| /users/user | GET | access_token: string | None |


**1. Register**
----
  Returns an access token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  name: string; email: string; password: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**

    ```js
    {
      "message": "Registered as a user!",
      "user": {
          "_id": "5de61836a9b2f15a0417e25a",
          "name": "johndoe",
          "email": "$2a$07$738j0cnEzr...",
          "password": "foo",
          "__v": 0
      },
      "access_token": "eyJhbGciOiJIUzI..."
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      ```js
      "messages": [
          "Email address has already been used!",
          "Your password is too short! Its length must be beween 5-15 characters."
      ]
      ```
}`

**2. Log in**
----
  Returns an access token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Data Params**

  email: string; password: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully loged in!",
      "user": {
          "_id": "5de61836a9b2f15a0417e25a",
          "name": "johndoe",
          "email": "johndoe@mail.com",
          "password": "$2a$07$738j0cnEzruvXrWCrN...",
          "__v": 0
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**3. Sign in with Google**
----
  Returns an access token.

* **URL**

  /users/googleSignIn

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   googleidtoken: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`

    OR

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**4. Fetch a user**
----
  Returns currently active user.

* **URL**

  /users/user

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "_id": "5de61836a9b2f15a0417e25a",
      "name": "johndoe",
      "email": "johndoe@mail.com",
      "password": "$2a$07$738j0cnEzruvXrWCrN61I...",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`
- - -
## **B. Article Routes**
- - -
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /articles/upload-image | POST | access_token: string | image: file | Upload an image |
|2.| /articles    | GET | access_token: string | None | Fetch all articles in database |
|3.| /articles | POST | access_token: string | title: string, content: string, featured_image: string, tags: array | Post an article |
|4.| /articles/:id | GET | access_token: string | None | Fetch a single article |
|5.| /articles/:id | PUT | access_token: string | title: string, content: string, featured_image: string, tags: array | Update an article |
|6.| /articles/:id | DELETE | access_token: string | None | Delete an article |
|7.| /articles/:id/tags | POST | access_token: string | content: string | Post a comment to an article |

**1. Upload an image file**
----
  Upload a single image file to the database.

* **URL**

  /articles/upload-single

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  image: file

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "data": imageUrl }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Upload image failed. Please try again!"
    ]
}`

**2. Fetch all articles**
----
  Returns all articles from the database.

* **URL**

  /articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    [
      {
        "message": "Successfully published an article!",
        "article": {
            "tags": [
                "personal",
                "life"
            ],
            "comments": [],
            "_id": "5de636c9481fb67ee302b56d",
            "title": "Limbo",
            "content": "...",
            "featured_image": "...",
            "author": "5de61836a9b2f15a0417e25a",
            "createdAt": "2019-12-03T10:19:53.852Z",
            "updatedAt": "2019-12-03T10:19:53.852Z",
            "__v": 0
          }
      },
      {...}
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch articles. Please refresh the browser!"
    ]
}`

**3. Add an article**
----
  Create a new article.

* **URL**

  /articles

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully published an article!",
      "article": {
          "tags": [
              "personal",
              "life"
          ],
          "comments": [],
          "_id": "5de636c9481fb67ee302b56d",
          "title": "Limbo",
          "content": "...",
          "featured_image": "...",
          "author": "5de61836a9b2f15a0417e25a",
          "createdAt": "2019-12-03T10:19:53.852Z",
          "updatedAt": "2019-12-03T10:19:53.852Z",
          "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```js
    {
      "messages": [
          "Failed to submit the article. Please try again!"
      ]
    }
    ```

    #### - OR - 

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```js
    {
      "messages": [
          "Unauthorized access!"
      ]
    }
    ```

    #### - OR -
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```js
    {
      "messages": [
          "Title should not be empty!",
          "Post should not be empty!"
      ]
    }
    ```

**4. Fetch an article**
----
  Fetch a specific article.

* **URL**

  /articles/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "article": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the article. Please try again!"
    ]
}`

**5. Update an article**
----

* **URL**

  PATCH /articles/:id

*  **Headers**

  - access_token: string

* **Body**

  - [title: string],
  - [content: string],
  - [featured_image: string],
  - [tags: array]

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Updated an article!",
      "article": {
          "tags": [
              "personal",
              "life"
          ],
          "comments": [],
          "_id": "5de63839e19dd501f0201cdd",
          "title": "Nobody Nobody",
          "content": "...",
          "featured_image": "...",
          "author": "5de63815e19dd501f0201cdc",
          "createdAt": "2019-12-03T10:26:01.521Z",
          "updatedAt": "2019-12-03T11:39:51.698Z",
          "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the article. Please try again!"
    ]
}`

**6.Delete an article**
----

* **URL**

  DELETE /articles/:id

*  **Headers**

   access_token: string

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "message": "Deleted an article!",
    "article": {
        "tags": [
            "personal",
            "life"
        ],
        "comments": [],
        "_id": "5de63839e19dd501f0201cdd",
        "title": "Nobody Nobody",
        "content": "...",
        "featured_image": "...",
        "author": "5de63815e19dd501f0201cdc",
        "createdAt": "2019-12-03T10:26:01.521Z",
        "updatedAt": "2019-12-03T11:39:51.698Z",
        "__v": 0
    }
}
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the article. Please try again!"
    ]
}`

**7.Add a comment to an article**
----

* **URL**

  POST /articles/:id/tags

*  **Headers**

   - access_token: string

* **Body**

  - content: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Posted a comment!",
      "comment": {
          "_id": "5de64783f1b0b11779a114c2",
          "content": "'Great article!'",
          "article": "5de63839e19dd501f0201cdd",
          "commenter": "5de63815e19dd501f0201cdc",
          "createdAt": "2019-12-03T11:31:15.534Z",
          "updatedAt": "2019-12-03T11:31:15.534Z",
          "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR<br />
    **Content:**
    ```js
    {
      "messages": [
        "Comment should not be empty!"
      ]
    }
    ```
}