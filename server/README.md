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
- `Article title required`: Happens specifically when you are manipulating Article (creating, editing). Please check if you accidentally removed the  `article's title`.
- `Invalid article status`: This happens when you try to create/edit your article status with invalid value. Check whether you have set the status correctly, or just leave it blank so the API will take care of it using it's default value.

### 404: Not Found

- `Article not found`: This could happen when you try to access deleted article, or the `article's id` is invalid. Recheck the `article's id` or, if not sure, try to use Get All Articles route to see the correct `id` for that article.

### 401: Unauthorized

- `Valid access token required`: Could happen in endpoints where `access_token` is reequired, which means almost all route endpoints. The cause could be the `access_token` is invalid, missing, or broken. If this still persist after you try to fix it, try requesting new `access_token` from Sign In endpoint.
- `User not found`: This happens when your account has been removed from the system (banned).

### 403: Forbidden

- `Unauthorized access to this article`: This means you are trying to modify (edit, delete) articles which is not authorised by you. If that's not the case, it's possibly because of incorrect `id`. Try to check it and make sure you were accessing the correct article.



## User Routes

### Sign Up

#### Endpoint

```http
POST /signup
```

#### Body

- username **Required** **Unique** Must only contains lowercase letters, numbers, dots and/or underscores.
- email **Required** **Unique** Must be a valid email format.
- password **Required** Must have at least 6 characters.
- fullName **Optional** Must only contains letters and spaces

#### Response

Status 201: Created

```json
{
  "message": "User registered",
  "data": {
    "user": {
      "username": "dummy",
      "email": "dummy@mail.com",
      "password": "123456",
      "fullName": "Dummy Guy"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTMzMzM3NjJhNWI5MzNjNTFkNDY2NCIsImVtYWlsIjoiZHVtbXlAbWFpbC5jb20iLCJpYXQiOjE1NzUxNzIwNTd9.9Wr2WAdXEp0nlkAJJUvqm4uXGYspxIFfZe-xTaLaUG4"
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
  "data": {
    "username": "dummy",
    "email": "dummy@mail.com",
    "fullName": "Dummy Guy"  
  } 
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
- status **Options:** `draft (default)` | `posted` | `trash` 

##### Response

Status 201: Created

```json
{
  "message": "Article created",
  "data": {
    "title": "Dummy Article",
    "content": "Article's content",
    "featuredImage": "https://cdn.dummyimages.com/photo/dummy-photo.jpg",
    "createdAt": "2019-12-01T06:10:11.674Z",
    "status": "draft"
  }
}
```



### Upload Image

This endpoint specifically used to handle image upload when you create article using editor in the client website. But you can also use this feature manually to get your image uploaded and receive it's url.

##### Endpoint

```http
POST /articles/image
```

##### Header

- access_token **Required**

##### Body

- image **Required** It should be an image file (Usually created using FormData object)

##### Response

Status 200: OK

```json
{
  "message": "Upload image success",
  "data": {
    "imageUrl": "https://cdn.dummyimages.com/photo/dummy-photo.jpg"
  }
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
      "status": "draft",
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
      "status": "draft",
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
      "status": "draft",
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
    "status": "draft",
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

- title
- content
- featuredImage 

##### Response

Status 200: OK

```json
{
  "message": "Article edited",
  "data": {
    "status": "draft",
    "_id": "5de359433425644760f0b7ce",
    "title": "Edited Dummy Article",
    "content": "Edited content",
    "featuredImage": "https://cdn.dummyimages.com/photo/edited-dummy-photo.jpg",
    "createdAt": "2019-12-01T06:10:11.674Z",
    "updatedAt": "2019-12-01T12:27:17.983Z"
  }
}
```



### Delete Article

##### Endpoint

```http
DELETE /articles/:id
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "message": "Article deleted",
  "data": {
    "_id": "5de359433425644760f0b7ce",
    "status": "deleted"
  }
}
```

