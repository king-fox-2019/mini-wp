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



## User Routes

### Sign Up User

#### Endpoint

```http
POST /signup
```

#### Body

- username **Required** Must only contain lowercase letters, numbers, dots and underscores.
- email
- password

#### Response

Status 201: Created

```json

```



### Sign In

#### Endpoint

```http
POST /signin
```

#### Body

- username | email | emailUsername
- password

#### Response

Status 200: OK

```json

```

