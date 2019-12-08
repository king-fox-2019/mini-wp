# MINI WP

An Application to blog an article

## 1. User

#### a. User Register

- **Endpoint**

  ```http
  POST /user/register
  ```

- **Body**

  username : String **(Required), (unique)**

  email : String **(Required), (unique)**

  password: String **(Required), (unique)**

- **Response**

  ```javascript
    {
        "_id": "5ded4aab900ff1ff44b30e96",
        "username": "japhendywijaya",
        "email": "japhendywijaya@hendy.com",
        "password": "$2a$05$fUrLhIJCACEGM3Jc0D125uFhYKNZf.dEh19CIn4lQ4MgjM29EBFne",
        "__v": 0
    }
  ```

- **Error**

  - Duplicate Username

    ```javascript
    {
         "code": 404,
        "message": "username has already been used"
    }
    ```

  - Duplicate email

    ```javascript
    {
        "code": 404,
        "message": "email has already been used"
    }
    ```

  - Empty email

    ```javascript
    {
        "code": 404,
        "message": "User validation failed: username: Path `username` is required., email: email is required"
    }
    ```

  - Empty password

    ```javascript
    {
        "code": 404,
    "message": "User validation failed: username: Path `username` is required., password: password is required"
    }
    ```

 - Empty username

    ```javascript
    {
        "code": 404,
        "message": "User validation failed: username: Path `username` is required."
    }


#### b. User Login

- **Endpoint**

  ```http
  POST /user/login
  ```

- **Body**

  email: String **(Required)**

  password: String **(Required)**


- **Response**

  ```javascript
  {
      "username": "hendy",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhOTBhYWY3OTA2YTZmMWM5YjQ1MDAiLCJpYXQiOjE1NzU4MzI0NDl9.4Y3PlHFx6v6t4IV_dpvaN7BE6sEPQcrWuDT7Ee5Ifmg"
  }
  ```

- **Error**

  - Error Email Not Register in Database

    ```javascript
    {
        "code": 403,
        "message": "email not found"
    }
    ```

  - Error Password Wrong

    ```javascript
    {
        "code": 403,
        "message": "wrong email & password combination"
    }
    ```

### C. Google Signin
**Endpoint**

  ```http
  POST /user/gsignin
  ```




## 2. Article

#### Authorization 
**Error**

  - Unauthorized Token

    ```javascript
    {
        "code": 403,
        "message": "unauthorized user"
    }
    ```

- Invalid Token

    ```javascript
    {
        "code": 403,
        "message": "invalid requirement; authentication not granted"
    }
    ```

#### a. Article Create

- **Endpoint**

  ```http
  POST /articles/create
  ```

- **Header**
    access_token : **(Required)**


- **Body**

  title : String **(Required)**

  content : String **(Required)**

  createAt: Date **(Required) (automatic)**

  featured_image(url) : String

- **Response**

  ```javascript
    { 
        "_id": "5ded4c45900ff1ff44b30e9d",
        "title": "title baru",
        "content": "content baru",
        "authorId": "5dea90a0f7906a6f1c9b44ff",
        "createdAt": "2019-12-08T19:17:25.136Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575832639802-19098_en_1.jpg",
        "__v": 0
    }
  ```


#### b.  Article findALl

- **Endpoint**

  ```http
  get /articles/all
  ```

- **Header**
    access_token : **(Required)**


- **Response**

  ```javascript
    [{
        "_id": "5ded39ccdbece7e79063e689",
        "title": "studying",
        "content": "<b><i><u>japas</u></i></b><div><b><i><u>fa</u></i></b></div><div><b><i>fa</i></b></div><div><b>f</b></div><div><b>as</b></div><div><b>fas</b></div><div>fas</div><div>f</div><div>a</div><div>fas</div><div>f</div><div>asf</div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T17:58:36.400Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575827910881-promompi3718.png",
        "__v": 0
    },
    {
        "_id": "5ded3e95dbece7e79063e690",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        "content": "<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</b><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:19:01.180Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575829139200-1509052984.jpg",
        "__v": 0
    },
    {
        "_id": "5ded3ea2dbece7e79063e691",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:19:14.047Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575829150583-17661660568_a2f29de01b_b.jpg",
        "__v": 0
    },
    {
        "_id": "5ded3eb4dbece7e79063e692",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        "content": "<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</i><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:19:32.205Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575829169349-10285894466_b72616f2c1_b.jpg",
        "__v": 0
    },
    {
        "_id": "5ded3ec8dbece7e79063e693",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        "content": "<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</b><div><br></div><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:19:52.333Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575829188376-flickr-2.jpg",
        "__v": 0
    },
    {
        "_id": "5ded3ededbece7e79063e694",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
        "content": "<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</b><div><br></div><div><br></div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br></div>",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:20:14.137Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575829211068-dea3dd12b50caab89a5a90bb6cb2b24c.jpg",
        "__v": 0
    },
    {
        "_id": "5ded473a900ff1ff44b30e93",
        "title": "jap",
        "content": "jap",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:55:54.886Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575831351168-flickr-2.jpg",
        "__v": 0
    },
    {
        "_id": "5ded474c900ff1ff44b30e94",
        "title": "jap hendy",
        "content": "jap hendy",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:56:12.728Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575831368316-iStock-971053374-2000x1200.jpg",
        "__v": 0
    },
    {
        "_id": "5ded476c900ff1ff44b30e95",
        "title": "jap hendy wijaya",
        "content": "jap hendy wijaya",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T18:56:44.450Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575831398043-landscape-photography-tom-archer-6.jpg",
        "__v": 0
    },
    {
        "_id": "5ded4c45900ff1ff44b30e9d",
        "title": "title baru",
        "content": "content baru",
        "authorId": {
            "username": "jap",
            "email": "jap@jap.com"
        },
        "createdAt": "2019-12-08T19:17:25.136Z",
        "featured_image": "https://storage.googleapis.com/bucket-jap/1575832639802-19098_en_1.jpg",
        "__v": 0
    }]



#### b.  Article delete

- **Endpoint**

  ```http
  DELETE /articles/
  ```

- **Header**
    access_token : **(Required)**


- **Body**
    articleId : **(Required)**

- **Response**

  ```javascript
    [{    "n": 1,
        "ok": 1,
        "deletedCount": 1
    }]