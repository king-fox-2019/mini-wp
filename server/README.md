**Register User**

* **Method:**
    `POST` 

* **URL**
    <_/register_>

* **Data Params** <br />
    **Required:**
    
    `name=[string]` <br />
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "_id": "5dbf463e66d4901e33fe6b81",
                "email": "foo@bar.com",
                "password": "$2a$10$8cEP6gHdxjU7aZimMA8xouv3Xq40htC6ikfpUHOdPsPWVg8IFHpzG",
                "name": "foo",
                "createdAt": "2019-11-03T21:27:26.087Z",
                "updatedAt": "2019-11-03T21:27:26.087Z",
                "__v": 0
            }
        ```

* **Error Response:**
  * **Code:** 500 Internal Server Error <br />
    **Content:** <br />
    `{
        "message": [
            "Email already registered"
        ]
    }` <br />
    `{
        "message": [
            "username required"
        ]
    }` <br />
    `{
        "message": [
            "Invalid email format"
        ]
    }` <br />


**Login User**

* **URL**
    <_/login_>

* **Method:**
    `POST` 

* **Data Params** <br />
    **Required:**
    
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            {
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY0NjNlNjZkNDkwMWUzM2ZlNmI4MSIsImVtYWlsIjoiYXNkYXNkYXNkQGFzZC5jb20iLCJpYXQiOjE1NzI4MTY1Mjl9.QPqj-wyuPI-pErO-PxDuJqe8a7gHysxRgQ8_yufcwH0"

            }
        ```

* **Error Response:**
  * **Code:** 401 Unauthorized <br />
    **Content:** <br />
    `{
        "message": "Email Not Found."
    }`


**Get All Articles**

* **URL**
    <_/articles>
* **Method:**
    `GET` 

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            [
                {
                    "_id": "5dc849754a895a81da0b6ae6",
                    "title": "Aricle 1",
                    "content": "<p>This is the content of article 1/p>",
                    "UserId": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                },
                {
                   "_id": "5dc849754a895a81da0b6ae6",
                    "title": "Aricle 2",
                    "content": "<p>This is the content of article 2/p>",
                    "UserId": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                }
            ]
        ```
* **Error Response:**
  * **Code:** 401 Unauthorized <br />
    **Content:** <br />
    `{
        "name": "JsonWebTokenError",
        "message": "Not authorized"
    }` <br />
    `{
        "name": "JsonWebTokenError",
        "message": "Authentication failed"
    }`

**POST a Article**

* **URL**
    <_/articles>
* **Method:**
    `POST` 

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `title=[string]` <br />
    `content=[string]` <br />
    `UserId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript
            [
                {
                    "_id": "5dc849754a895a81da0b6ae6",
                    "title": "Aricle 1",
                    "content": "<p>This is the content of article 1/p>",
                    "UserId": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                },
                {
                   "_id": "5dc849754a895a81da0b6ae6",
                    "title": "Aricle 2",
                    "content": "<p>This is the content of article 2/p>",
                    "UserId": "5dc848cd3fca71811dfc4087",
                    "createdAt": "2019-11-10T17:31:33.252Z",
                    "updatedAt": "2019-11-10T17:31:33.252Z",
                    "__v": 0
                }
            ]
        ```
* **Error Response:**
  * **Code:** 500 Internal Server Error <br />
    **Content:** <br />
    `{
        "message": "article's title required"
    }` <br />
    `{
        "message": "minimum character is 100"
    }` <br />
    `{
        "message": "content required""
    }` <br />


**Delete an article**

* **URL**
    <_/articles/:id_>

* **Method:**
    `DELETE` 

* **Headers** <br />
    `Authorization=[string]`

* **Data Params** <br />
    `:id=[string]`

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```javascript 
            {  
                "_id": "5dc849754a895a81da0b6ae6",
                "title": "Aricle 1",
                "content": "<p>This is the content of article 1/p>",
                "UserId": "5dc848cd3fca71811dfc4087",
                "createdAt": "2019-11-10T17:31:33.252Z",
                "updatedAt": "2019-11-10T17:31:33.252Z",
                "__v": 0 
            }  
        ```
* **Error Response:**
	* **Code:** 401 Unauthorized <br />
	    **Content:** <br />
	    `{
	        "name": "JsonWebTokenError",
	        "message": "Not authorized"
	    }` <br />
	    `{
	        "name": "JsonWebTokenError",
	        "message": "Authentication failed"
	    }`