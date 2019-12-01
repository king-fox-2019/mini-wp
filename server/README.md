# TYPRESS

Wordpress-like app with RESTfull API. Using express js for routing and mongoDB with mongoose for database driver.



## Base Url

For local usage, the default url is

```http
http://localhost:3000
```

You can change the default port from 3000 if necessary (see Guide section below).



## Errors

There are multiple errors that might happen, and this section is intended to capture all those error, the cause, and possibly some ways to resolve the issue.

### 422: Unprocessable Entity

- User validation error: Often happens on Sign Up. Require you to check whether you've sent correct data, all required fields were filled, and all validation passed. Change all fields causing error, and resend your data. Example message: `Username Required`, `Email already registered`, `Password min length 6`.
- `Wrong username/email/password`: Happens on Sign In. Caused by missing fields, invalid data values, or probably you just havent's Sign Up yet. Fix all data, or change to the correct route if you happen to be in the last case, and try again.
- `Valid access token required`: Could happen in endpoints where `access_token` is reequired, which means almost all route endpoints. This could mean that the `access_token` is invalid, missing, or broken. If this still persist after you try to fix it, try requesting new `access_token` from Sign In endpoint.
- `Article title required`: Happens specifically when you are manipulating Article (creating, editing). Please check if you accidentally removed the  `article's title`.

### 404: Not Found

- `User not found`: This happens when your account has been removed from the system (banned).



## User Routes

### Sign Up

#### Endpoint

```http
POST /signup
```

#### Body

- username **Required** **Unique** Must only contains lowercase letters, numbers, dots and/or underscores.
- email **Required** **Unique** Must be unique and valid email format.
- password **Required** Must have at least 6 characters.
- fullName **Optional** Must only contains letters and spaces

#### Response

Status 201: Created

```json
{
  "message": "User registered",
  "data": {
    "username": "dummy",
    "email": "dummy@mail.com",
    "password": "123456",
    "fullName": "Dummy Guy"
  }
}
```



### Sign In

#### Endpoint

```http
POST /signin
```

#### Body

- username | email | emailUsername **Required** One of them must be included
- password **Required**

#### Response

Status 200: OK

```json
{
  "Message": "Sign in success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTMzMzM3NjJhNWI5MzNjNTFkNDY2NCIsImVtYWlsIjoiZHVtbXlAbWFpbC5jb20iLCJpYXQiOjE1NzUxNzIwNTd9.9Wr2WAdXEp0nlkAJJUvqm4uXGYspxIFfZe-xTaLaUG4"
  }
}
```



### Check Session

This, as opposed to Sign In, is used to verify `access_token` and return it's payload. It's internally used to verify client access and redirects it based on verification result.

##### Endpoint

```http
GET /user/checksession
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "username": "dummy",
  "email": "dummy@mail.com",
  "fullName": "Dummy Guy"
}
```



## Article Routes

### Create Article

##### Endpoint

```http
POST /articles
```

##### Header

- access_token **Required**

##### Body

- title **Required**
- content
- featuredImage 

##### Response

Status 201: Created

```json
{
  "title": "Dummy Article",
  "content": "Article's content",
  "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo.jpg",
  "createdAt": "2019-12-01T06:10:11.674Z"
}
```



### Get All Articles

##### Endpoint

```http
GET /articles
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
    "data": [
        {
            "_id": "5de359433425644760f0b7ce",
            "title": "Dummy Article",
            "author": {
                "_id": "5de341c363ff983e29bd7389",
                "username": "dummy",
                "email": "dummy@mail.com",
                "fullName": "Dummy Guy"
            },
            "content": "Article's content",
            "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo.jpg",
            "createdAt": "2019-12-01T06:10:11.674Z",
            "updatedAt": "2019-12-01T06:10:11.674Z"
        },
        {
            "_id": "5de3594c3425644760f0b7cf",
            "title": "Dummy Article 2",
            "author": {
                "_id": "5de341c363ff983e29bd7389",
                "username": "dummy2",
                "email": "dummy2@mail.com",
                "fullName": "Dummy Guy The Second"
            },
            "content": "Article's content 2",
            "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo2.jpg",
            "createdAt": "2019-12-01T06:10:20.945Z",
            "updatedAt": "2019-12-01T06:10:20.945Z"
        }
    ]
}
```



### Get All User Articles

##### Endpoint

```http
GET /user/articles
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "data": [
    {
      "_id": "5de359433425644760f0b7ce",
      "title": "Dummy Article",
      "content": "Articles' content",
      "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo.jpg",
      "createdAt": "2019-12-01T06:10:11.674Z",
      "updatedAt": "2019-12-01T06:10:11.674Z"
    }
  ]
}
```



### Get One Article

##### Endpoint

```http
GET /articles/:id
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "data": {
    "_id": "5de359433425644760f0b7ce",
    "title": "Dummy Article",
    "author": {
      "_id": "5de341c363ff983e29bd7389",
      "username": "dummy",
      "email": "dummy@mail.com",
      "fullName": "Dummy Guy"
    },
    "content": "Articles' content",
    "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo.jpg",
    "createdAt": "2019-12-01T06:10:11.674Z",
    "updatedAt": "2019-12-01T06:10:11.674Z"
  }
}
```



### Edit Article

##### Endpoint

```http
PUT /articles/:id
```

##### Header

- access_token **Required**

##### Body

- title **Required**
- content
- featuredImage 

##### Response

Status 200: OK

```json

```

