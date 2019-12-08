# miniWP API

GETTING STARTED

First, install all depedency we need. Open terminal on the server folder, and run this command:

```
npm install
```

Then create enviroment file (.env file) and set these variabel:

```
PORT="< port number >"
JWT_SECTRE="< JSON Web Token Secret >"
```

Fire up the server by typing this command on terminal

```
npm run dev
```



## API Documentation

### USER

* **Register new user**

  > 		POST  /user

  ```
  body: {
  	name,
  	email,
  	password
  }
  ```

  * Success response:

    * Code: 201

    ```
    {
        "_id": "5de2ab10324239617c6fad45",
        "name": "Muhammad Ilham",
        "email": "muhammadilham@mail.com",
        "password": "$2a$10$NtcnpVA3ZK3qyLrW3viB0OBLf3YWYND8pItyRbB9kFuyPX4/O5HJy",
        "__v": 0
    }
    ```

* **User Login**

  > POST /user/login

  ```
  body: {
  	email, 
  	password
  }
  ```

  * Success response: 

    * Code: 202

    ```
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTE3YTFkYzY3Nzc0MmJiZTI3YjExZCIsIm5hbWUiOiJNdWhhbW1hZCBJbGhhbSIsImlhdCI6MTU3NTEzNjMzN30.JaFSEFYDwX7i1X1oPihlkTqn0wSkOhayeQYsMJflJBA"
    ```





---

### Article

* **Create New Article**

  > POST /todo

  ```
  Body: {
  	title: name example,
  	content: content example,
  },
  headers: {
  	token
  }
  ```
  
* Success response: 
  
  * Code: 201
  
    ```
      {
         // article information
      }
      ```
      
      
    
  * Error response:
  
    * Code: 400
  
    ```
      {
        "code": 400,
          "message": "You have to login first!"
    }
      ```

    * Code: 500
  
      ```
      {
      	"code": 500,
      	"message": "internal server error"
    }
      ```

* **Show Article **

  > GET /todo

  ```
  headers: {
  	token
  }
  ```

  * Success response: 

    * Code: 201

      ```
      //Array of object
      ```
    
  * Error response:
  
    * Code: 400
  
      ```
      {
          "code": 400,
          "message": "You have to login first!"
      }
      ```
  
    * Code: 500
  
    ```
      {
    	"code": 500,
      	"message": "internal server error"
    }
      ```
  
* **Show Author Article**

  > PATCH /todo

  ```
  headers: {
  	token
  }
  ```
  
  * Success response:
  
    * Code: 200

      ```
    //Showing author article
      ```
  
  * Error response:
  
    * Code: 500
  
      ```
      {
    	"code": 500,
      	"message": "internal server error"
    }
      ```

* **Delete Todo**

  > DELETE /todo

  ```
  body: {
  	id
  },
  headers: {
  	token
  }
  ```

  * Success response:

    * Code: 200

      ```
      {
      	"status": 200,
      	"message": "Deleted"
      }
      ```

  * Error response:

    * Code: 400

      ```
      {
          "code": 401,
          "message": "Only Owner can modified todo!"
      }
      ```

    * Code: 500

      ```
      {
      	"code": 500,
      	"message": "internal server error"
      }
      ```

  