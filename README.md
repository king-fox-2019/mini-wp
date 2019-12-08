# mini-wp

**Base URL**

  http://localhost:3000

**Login**
----
  Returns access token.

* **URL**

  /user/login

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `ACCESS_TOKEN`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ code: 400, message: 'Wrong email or password'}`

* **Sample Call:**

  ```javascript
    axios({
      method: 'post',
      url: 'http://localhost:3000/user/login',
      data: {
        email: EMAIL,
        password: PASSWORD
      }
    })
  ```
**Register**
----
  Returns access token.

* **URL**

  /user/register

* **Method:**

  `POST`
  
* **Data Params**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `ACCESS_TOKEN` 

* **Sample Call:**

  ```javascript
    axios({
      method: 'post',
      url: 'http://localhost:3000/user/register',
      data: {
        email: EMAIL,
        password: PASSWORD
      }
    })
  ```

**Show All Todo**
----
  Returns json data containing todos of a user.

* **URL**

  /todo

* **Method:**

  `GET`

* **Headers**

   `access_token = ACCESS_TOKEN`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `  [{
    _id: ID,
    title: TITLE,
    content: CONTENT,
    author: AUTHOR ID,
    featured_image: GOOGLE CLOUD IMAGE URL,
    createdAt: DATE,
    updatedAt: DATE,
    __v: 0
  }]
`
 
* **Sample Call:**

  ```javascript
      axios({
        method:'get',
        url: 'http://localhost:3000/todo',
        headers: {
          access_token: ACCESS_TOKEN
        }
      })
  ```

**Create Todo**
----
  Returns status 201.

* **URL**

  /todo

* **Method:**

  `POST`

* **Data Params**

  FormData {
    title: [string],
    content: [string],
    file: [file]
}

* **Headers**

  ACCESS_TOKEN

* **Success Response:**

  * **Code:** 201
 
* **Sample Call:**

  ```javascript
     axios({
        method: 'post',
        url: 'http://localhost:3000/todo',
        data: FORMDATA OBJECT,
        headers: {
          access_token: ACCESS_TOKEN
        }
      })
  ```

**Show One Todo**
----
  Returns json data containing a todo with the specified id.

* **URL**

  /todo/:id

* **Method:**

  `GET`

*  **URL Params**
 
   `id=[string]`

* **Headers**

   `access_token = ACCESS_TOKEN`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `  {
    _id: ID,
    title: TITLE,
    content: CONTENT,
    author: AUTHOR ID,
    featured_image: GOOGLE CLOUD IMAGE URL,
    createdAt: DATE,
    updatedAt: DATE,
    __v: 0
  }
`
 
* **Sample Call:**

  ```javascript
      axios({
        method:'get',
        url: 'http://localhost:3000/todo/ID',
        headers: {
          access_token: ACCESS_TOKEN
        }
      })
  ```

**Delete Todo**
----
  Returns status 200.

* **URL**

  /todo/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 200

* **Sample Call:**

  ```javascript
    axios({
        method:'delete',
        url: 'http://localhost:3000/todo/ID',
        headers: {
          access_token: ACCESS_TOKEN
        }
      })
  ```

**Edit Todo**
----
  Returns status 200.

* **URL**

  /todo/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   `id=[string]`

* **Data Params**

  {
    title: [string],
    content: [string]
  }

* **Headers**
  
  ACCESS_TOKEN

* **Success Response:**

  * **Code:** 200
 
* **Sample Call:**

  ```javascript
    axios({
        method: 'patch',
        url: `http://localhost:3000/todo/ID`,
        data: {
          title: TITLE,
          content: CONTENT
        },
        headers: {
          access_token: ACCESS_TOKEN
        }
      })
  ```
