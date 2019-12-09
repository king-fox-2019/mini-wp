# API DOCUMENTATION - AllKpop's remake (student project)

<hr>
Recreate Allkpop which an English-language, US-based Korean pop blog launched on October 30, 2007, and based in Edgewater, New Jersey. Owned and operated by parent company 6Theory Media, allkpop is one of the most trafficked K-pop news sites, with over seven and half million readers per month. 



> Base url : <http://mini-wp.dwitama-alfred.xyz/>



<h2>User Routes </h2>
<hr>

## Register [post]

> <http://mini-wp.dwitama-alfred.xyz//users/register>

- Request (application/json)

```
{
	"fullname" : "username"
	"email" : "user@mail.com",
	"password" : "123456",
	"file" : file (.jpg/.png)
}
```

- Response 200 (application/json)

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVkNThkYzllYmJmZjE5OGVlY2QwYWEiLCJmdWxsbmFtZSI6ImFkbWluaXN0cmF0b3IyIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yMkBtYWlsLmNvbSIsImlhdCI6MTU3NTgzNTg2OH0.9W3VS260F6DWOtUGYU1oN3Nn15zteQtjfuVJq6FhHW8"
}
```

- Response 400 (application/json)

```
{
      "message": "Email is already registered"
 }
```



## Login [post]

> <http://mini-wp.dwitama-alfred.xyz//users/login>

- Request (application/json)

```
{
	"email" : "user@mail.com",
	"password" : "123456"
}
```

- Response 200 (application/json)

```
{
      "accessToken": 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
}
```

- Response 401 (application/json)

```
{
      "message": "Wrong email/password"
 }
```



<h2>Article Routes </h2>
<hr>


## Show All Article (public) [get]

> <http://mini-wp.dwitama-alfred.xyz//articles/all>

- Request (application/json)


```
{
	"title" : "Your New Project",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
[
    {
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "debut",
            "kpop"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833587872-everglow1.png",
            "https://storage.googleapis.com/bucket-alfred/1575833587881-everglow4.jpeg"
        ],
        "likes": [
            "5ded49cf31d4df103b8d4da3",
            "5ded3e02322f050a3720f2ab"
        ],
        "dislike": [],
        "_id": "5ded4ff6f45a6b12a1570db0",
        "title": "Everglow ready for debut showcase",
        "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: 
                    rgb(34, 34, 34);\">Everglow is a South Korean girl group under 		
                    Yuehua Entertainment.The group is composed of six members: E:U, 
                    Sihyeon, Mia, Onda, Aisha and Yiren. Everglow debuted on March 18, 
                    2019, with the album Arrival of Everglow.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    },
    {
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "yiren",
            "produce48"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682851-yiren 
            everglow.jpeg",
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ],
        "likes": [
            "5ded49cf31d4df103b8d4da3",
            "5ded3e02322f050a3720f2ab",
            "5ded3b2fa289e608143d3c07"
        ],
        "dislike": [],
        "_id": "5ded5054f45a6b12a1570db1",
        "title": "Yiren from everglow snapped top 20 in produce 48",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            										u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    }
]
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```





## Show Personal Article  [get]

> <http://mini-wp.dwitama-alfred.xyz//articles/>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  
  
  
  
  Response 200 (application/json)

```
[
    {
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "debut",
            "kpop"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833587872-everglow1.png",
            "https://storage.googleapis.com/bucket-alfred/1575833587881-everglow4.jpeg"
        ],
        "likes": [
            "5ded49cf31d4df103b8d4da3",
            "5ded3e02322f050a3720f2ab"
        ],
        "dislike": [],
        "_id": "5ded4ff6f45a6b12a1570db0",
        "title": "Everglow ready for debut showcase",
        "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: 
                        rgb(34, 34, 34);\">Everglow is a South Korean girl group under 		
                        Yuehua Entertainment.The group is composed of six members: E:U, 
                        Sihyeon, Mia, Onda, Aisha and Yiren. Everglow debuted on March 18, 
                        2019, with the album Arrival of Everglow.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    },
    {
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "yiren",
            "produce48"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682851-yiren 
            everglow.jpeg",
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ],
        "likes": [
            "5ded49cf31d4df103b8d4da3",
            "5ded3e02322f050a3720f2ab",
            "5ded3b2fa289e608143d3c07"
        ],
        "dislike": [],
        "_id": "5ded5054f45a6b12a1570db1",
        "title": "Yiren from everglow snapped top 20 in produce 48",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            										u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    }
]
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```



## Create Personal Article  [post]

> <http://mini-wp.dwitama-alfred.xyz//articles>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- 

```
{
        "tags": ["everglow","yiren","produce48"],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682851-yiren 
            everglow.jpeg",
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ]
        "title": "Yiren from everglow snapped top 20 in produce 48",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
    }
```

- Response 200 (application/json)

```
{
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "yiren",
            "produce48"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682851-yiren 
            everglow.jpeg",
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ],
        "likes": [],
        "_id": "5ded5054f45a6b12a1570db1",
        "title": "Yiren from everglow snapped top 20 in produce 48",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            										u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Delete Personal Article [delete]

> <http://mini-wp.dwitama-alfred.xyz//todos/:id>

- Request (application/json)

  Params:  id ( article id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "delete article success"
}
```

- Response 401 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Article  [put]

> <http://mini-wp.dwitama-alfred.xyz//articles/:id>

- Request (application/json)

  Params:  id ( article id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "tags": ["everglow"],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ]
        "title": "Yiren from everglow snapped top 20 in produce 48 - EDIT",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
    }
```

- Response 200 (application/json)

```
{
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ],
        "likes": [],
        "_id": "5ded5054f45a6b12a1570db1",
        "title": "Yiren from everglow snapped top 20 in produce 48 - EDIT",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            										u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Like Articles [patch]

> <http://mini-wp.dwitama-alfred.xyz//articles/:id/likes>

- Params:  id ( article id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```
{
        "publishedAt": "2019-12-08T19:25:09.809Z",
        "tags": [
            "everglow",
            "yiren",
            "produce48"
        ],
        "images": [
            "https://storage.googleapis.com/bucket-alfred/1575833682851-yiren 
            everglow.jpeg",
            "https://storage.googleapis.com/bucket-alfred/1575833682854-wan yiren.jpeg"
        ],
        "likes": ["5ded3e02322f050a3720f2ab"],
        "_id": "5ded5054f45a6b12a1570db1",
        "title": "Yiren from everglow snapped top 20 in produce 48",
        "description": "<p><span style=\"color: rgb(34, 34, 34); background-color: rgb(255, 
                        255, 255);\">Wang&nbsp;Yiren&nbsp;(왕이런) is the Center and youngest 
                        member of the girl group&nbsp;Everglow&nbsp;under Yuehua 		
                        Entertainment.&nbsp;Yiren&nbsp;is best known for appearing in 
                        Produce 48 where she was voted as the #1 Visual Center.</span></p>",
        "userId": {
            "_id": "5ded3e02322f050a3720f2ab",
            "fullname": "Dwitama Alfred",
            "profilePicture": "https://lh3.googleusercontent.com/a-/AAuE7mCuMw1nEMd_hmzqhB-
            										u72SKNN9VHNEu4VoxDk-YQg=s96-c",
            "email": "dwitama.alfred@gmail.com",
            "password": "$2b$11$3ErMgHoGusi84qfElUgz0O5lWQAxvKnmRaIWjvdeLTNwQ97Y0ruqK",
            "createdAt": "2019-12-08T18:16:34.429Z",
            "updatedAt": "2019-12-08T18:16:34.429Z"
        },
        "__v": 0
    }
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



