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

```

