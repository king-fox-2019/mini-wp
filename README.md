# mini-wp

  ```json
  http://localhost:3000
  ```

## USER REGISTER

- **URL's**

  ```json
  /users/register
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `username: [string]` , `email: [string]` , `password: [string]`
  - Optional : `address: [string]`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "id": "5deb5c620d5e4fe559769076",
        "username": "sukmabrahmantya",
        "email": "sukmabrahmantya@mail.com"
    }
    ```

- **Error Response**

  - Validation Username

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: username: Username cannot be empty!"
      }
      ```

  - Validation Password

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: password: Password cannot be empty!"
      }
      ```

  - Validation Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email cannot be empty!"
      }
      ```

  - Validation Unique Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email is available!"
      }
      ```

- **Sample Call**

  ```javascript
  axios
    .post("users/register", {
      email: this.email,
      password: this.password,
      username: this.username
    })
  
  ```



## USER LOGIN

- **URL's**

  ```json
  /users/login
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email: [string]` , `password: [string]`
  - Optional : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
      	"id": "5deb5c620d5e4fe559769076",
        "username": "sukmabrahmantya",
        "email": "sukmabrahmantya@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWI1YzYyMGQ1ZTRmZTU1OTc2OTA3NiIsImlhdCI6MTU3NTcwNTg4Mn0.Sgu7V9gBBiNrCh8KKiLVNDtb25Qtzk_MkQUtzkaO0ng"
    }
    ```

- **Error Response**

  - Validation Passwords and Users do not Match

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Password / Username is wrong"
      }
      
      ```

  - Validation User has not Registered

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Password / Username is wrong"
      }
      
      ```

- **Sample Call**

  ```javascript
    axios
    .post("users/login", {
      email: this.form.email,
      password: this.form.password
    })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      this.$emit("islogin", true);
    })
    .catch(err => {
      console.log(err.response.data);
    });
  
  ```



## ARTICLE CREATE

- **URL's**

  ```json
  /articles/
  
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `title: [string]` 
  - Optional : `content: [string]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 Created

  - Content :

    ```json
    {
        "status": "created",
        "_id": "5deb63ef79bc70ecf6c84da9",
        "title": "Article Title",
        "content": "Article content",
        "created_at": "2019-12-07T08:33:51.854Z",
        "userId": "5deb5c620d5e4fe559769076",
        "__v": 0
    }
    
    ```

- **Error Response**

  - Validation Title

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Article validation failed: title: Title cannot be empty!"
      }
      
      ```

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  axios
    .post("articles",
      {
        title: this.title,
        content: this.myHTML,
        image: this.image
      },
      {
        headers: { token: localStorage.getItem("token") }
      }
    )
    .then(({ data }) => {
      this.$emit("created");
    })
    .catch(err => {
      console.log(err.response.data);
    });  
  
  ```



## ARTICLE READ

- **URL's**

  ```json
  /articles/
  
  ```

- **URL Params**

  - Require : `none`
  - Optional : `title: [string]` , `status: [string]`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "status": "created",
            "_id": "5deb63ef79bc70ecf6c84da9",
            "title": "Article Title",
            "content": "Article content",
            "created_at": "2019-12-07T08:33:51.854Z",
            "userId": "5deb5c620d5e4fe559769076",
            "__v": 0
        },
        {
            "status": "pending",
            "_id": "5deb63db79bc70ecf6c84da8",
            "title": "Article Title",
            "content": "Article content",
            "created_at": "2019-12-07T08:33:31.414Z",
            "userId": "5deb5c620d5e4fe559769076",
            "__v": 0
        },
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  getArticle() {
    axios
      .get("users/articles", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(({ data }) => {
        this.articles = data;
      })
      .catch(err => {
        console.log(err.response);
      });
  
  ```



## ARTICLE UPDATE

- **URL's**

  ```json
  /articles/:id
  
  ```

- **URL Params**

  - Require : `id: [integer]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `title: [string]` ,  `content: [string]` ,  `status: [string]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
    		"status": "created",
        "_id": "5deb63ef79bc70ecf6c84da9",
        "title": "Updated title",
        "content": "updated content",
        "created_at": "2019-12-07T08:33:51.854Z",
        "userId": "5deb5c620d5e4fe559769076",
        "__v": 0  
    }
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  
  ```



## ARTICLE DELETE

- **URL's**

  ```json
  /articles/:id
  
  ```

- **URL Params**

  - Require : `id: [integer]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "status": "created",
        "_id": "5deb63ef79bc70ecf6c84da9",
        "title": "Deleted article",
        "content": "Deleted article",
        "created_at": "2019-12-07T08:33:51.854Z",
        "userId": "5deb5c620d5e4fe559769076",
        "__v": 0
    }
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  axios
    .delete(`articles/${val._id}`, {
      headers: { token: localStorage.getItem("token") }
    })
  
    .then(({ data }) => {
      this.getArticle();
    })
    .catch(err => {
      console.log(err.response);
    });
  
  ```