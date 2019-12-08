# wowordpress

## Deploy link
```
$ wowordpress.firebaseapp.com
```

## Installation Package

```
$ npm install
```

# Client server available
```
http://localhost:1234
```

# Routes User

## Register

```
POST : http://localhost:3000/user/
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String *required
 * @username String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(201) data(access_token, email)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Login

```
POST : http://localhost:3000/user/login
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(200) data(access_token, email)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Google Sign in

```
POST : http://localhost:3000/user/google
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @token google-id-token *required
 */
```
Response
```
/**
 * @success status(200) data(access_token, email)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## detail article

```
GET : http://localhost:3000/article/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## tag article

```
GET : http://localhost:3000/article/tag/:tag
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## User's article

```
GET : http://localhost:3000/article/author
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add article

```
POST : http://localhost:3000/article
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * multipart/form-data format

 * @title String *required
 * @article String *required
 * @image File *required
 */
```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(201) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Delete article

```
DELETE : http://localhost:3000/article/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Update with image article

```
PUT : http://localhost:3000/article/image/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * multipart/form-data format
 * @title String *required
 * @image String *required
 * @content String *required
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Update without image article

```
PUT : http://localhost:3000/article/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @title String *required
 * @description String *required
 */
```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add Tag article

```
PATCH : http://localhost:3000/article/tag/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @tag String *required
 */
```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
