# mini-wp

Getting things done more easily like never before

## Base URL

```http
http://localhost:PORT
```

## User Routes

------------------------------------

### Signin

Signin yourself in order to obtain the `access token`

### Endpoint

```http
POST /user/signin
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 201: Created

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
#### Error

##### Status 401: Email is not registered

##### Status 401: Invalid password

##### Status 500: Internal Server Error



------------------------------------

### Google Login

Login more easily through your Google account

### Endpoint

```http
POST /signin/google
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 200: Created

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
#### Error

##### Status 401: Invalid email

##### Status 500: Internal Server Error

------------------------------------

### Sign Up

Get yourself registered and privilege to access endpoints

### Endpoint

```http
POST /user/signup
```
#### Body
- username: String
- email: String
- password: String

#### Response

#### Success

##### Status 201: Successfully created

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
#### Error

##### Status 500: Internal Server Error
------------------------------------

### Show User Details

See user details

### Endpoint

```http
GET /user/:userId
```
#### Header

access_token: String ***Required***

#### Response

##### Status 200:

```json
{
  "_id": "5ded88de66a0dc3e0d3021bc",
  "username": "deprak5441",
  "email": "deprak@mail.com",
  "articles": "['5ded891666a0dc3e0d3021bd', '5ded891666a0dc3e0d3021bd', ...]"
}
```
#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

------------------------------------

### Show Your Articles

Read an article

### Endpoint

```http
GET /user/myArticles
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
[
  {
    "author": "5ded88de66a0dc3e0d3021bc",
    "title": "The Title",
    "content": "This is my article...",
    "created_at": "2019-12-08T23:36:54.997Z",
    "featured_image": "https://storage.googleapis.com/...",
    "_id": "5ded891666a0dc3e0d3021bd"
  },
  {
    "author": "5dwe5t32dr6a0dc3e0d3034po",
    "title": "Another Title",
    "content": "Write to remember...",
    "created_at": "2019-12-09T14:36:54.997Z",
    "featured_image": "https://storage.googleapis.com/...",
    "_id": "5de77y4re6a0dc3e0d3021xw"
  },
  ..

]
```
#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

------------------------------------

### Show Your Articles

Read an article

### Endpoint

```http
GET /user/myArticles
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
[
  {
    "author": "5ded88de66a0dc3e0d3021bc",
    "title": "The Title",
    "content": "This is my article...",
    "created_at": "2019-12-08T23:36:54.997Z",
    "featured_image": "https://storage.googleapis.com/...",
    "_id": "5ded891666a0dc3e0d3021bd"
  },
  {
    "author": "5dwe5t32dr6a0dc3e0d3034po",
    "title": "Another Title",
    "content": "Write to remember...",
    "created_at": "2019-12-09T14:36:54.997Z",
    "featured_image": "https://storage.googleapis.com/...",
    "_id": "5de77y4re6a0dc3e0d3021xw"
  },
  ..

]
```
#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

------------------------------------

### Show One Article

Read an article

### Endpoint

```http
GET /articles/:articleId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
{
  "author": "5dwe5t32dr6a0dc3e0d3034po",
  "title": "Another Title",
  "content": "Write to remember...",
  "created_at": "2019-12-09T14:36:54.997Z",
  "featured_image": "https://storage.googleapis.com/...",
  "_id": "5de77y4re6a0dc3e0d3021xw"
}
```
#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

------------------------------------

### Edit Article

Edit your article

### Endpoint

```http
PATCH /api/articles/:articleId
```
#### Header

access_token: String ***Required***

#### Body

- title: String (requireed)
- content: String (requireed)
- featured_image: String (requireed)

#### Response

#### Success

##### Status 200:

```json
{
    "message": "Updated"
}
```
#### Error

##### Error 401: Invalid access token

##### Error 403: Forbidden access

##### Status 500: Internal Server Error

------------------------------------

### Delete Article

Delete your article

### Endpoint

```http
DELETE /articles/:articleId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200: Deleted

```json
{
    "message": "Deleted"
}
```
#### Error

##### Error 401: Invalid access token

##### Error 403: Forbidden access

##### Status 500: Internal Server Error


