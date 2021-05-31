# API DOCUMENTATION

## POST/login

### > Request Body
note: when login admin
```JSON
{
 "email":"muktientutz@mail.com",
 "password":"sistamania"
}
```
### > Response
#### - Success Response (200-OK) 
note : when successfully login admin
```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw",
    "isAdmin": true
}
```

## POST/login
note: when login customer

### > Request Body
```JSON
{
 "email":"benidictivity@mail.com",
 "password":"korbantenggelam"
}
```
### > Response
#### - Success Response (200-OK) 
note : when successfully login customer
```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkJlbmlkaWN0aXZpdHkiLCJlbWFpbCI6ImJlbmlkaWN0aXZpdHlAbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIwODE5MDgwOTE4MDgiLCJpYXQiOjE2MjIzNjQ4MDh9.lxZLlS2mm8B9Yi-bGGg5ikP-CZz-pYhzC6rBN8e_B6w",
    "isAdmin": false
}
```

## POST/register

### > Request Body
note: when register Customer
```JSON
{
        "name": "Aman aja",
        "email": "aman.aja@kak.com",
        "password": "aman",
        "phone_number": "0812313123111"
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully register
```JSON
{
    "id": 4,
    "name": "Aman aja",
    "email": "aman.aja@kak.com",
    "phone_number": "0812313123111",
    "isAdmin": false
}
```

---

## GET/products

### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Body

### > Response
#### - Success Response (200-OK) 
note : when success
```JSON
[
    {
        "id": 1,
        "name": "Taro Snack Net Seaweed Pck 70G",
        "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
        "description": "Rasa Seaweed ukuran 70 Gram",
        "barcode_number": "1414100003",
        "stock": 18,
        "price": 9500,
        "stockBefore": 5,
        "createdAt": "2021-05-30T04:16:35.484Z",
        "updatedAt": "2021-05-30T09:20:01.831Z"
    },
    {
        "id": 3,
        "name": "Taro Net Seaweed Pck 90G",
        "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
        "description": "Rasa Seaweed ukuran 90 Gram",
        "barcode_number": "14141000032",
        "stock": 10,
        "price": 12500,
        "stockBefore": 10,
        "createdAt": "2021-05-30T09:04:50.391Z",
        "updatedAt": "2021-05-30T09:22:13.257Z"
    }
]
```

---

## GET/products/:barcode_number

### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```

### > Request Params
```JSON
"barcode_number": 1414100003
```

### > Request Body

### > Response
#### - Success Response (200-OK) 
note : when success
```JSON
{
    "id": 1,
    "name": "Taro Snack Net Seaweed Pck 70G",
    "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
    "description": "Rasa Seaweed ukuran 70 Gram",
    "barcode_number": "1414100003",
    "stock": 18,
    "price": 9500,
    "stockBefore": 5,
    "createdAt": "2021-05-30T04:16:35.484Z",
    "updatedAt": "2021-05-30T09:20:01.831Z"
}
```

---
## POST/products

### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Body
```JSON
{
    "name": "wwwwa Taro Snack Net Seaweed Pck 70G",
    "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
    "description": "Rasa Seaweed ukuran 70 Gram",
    "barcode_number": "1414100003",
    "stock": 5,
    "price": 9500,
    "stockBefore": 5
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully created
```JSON
{
    "id": 3,
    "name": "wwwwa Snack Net Seaweed Pck 70G",
    "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
    "description": "Rasa Seaweed ukuran 70 Gram",
    "barcode_number": "1414100003",
    "stock": 5,
    "price": 9500,
    "stockBefore": 5,
    "updatedAt": "2021-05-30T09:04:50.391Z",
    "createdAt": "2021-05-30T09:04:50.391Z"
}
```

---

## PUT/products/:id
### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Params
```JSON
"id": 3
```
### > Request Body

```JSON
{
    "name": "Taro Net Seaweed Pck 90G",
    "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
    "description": "Rasa Seaweed ukuran 70 Gram",
    "barcode_number": "14141000032",
    "stock": 10,
    "price": 12500,
    "stockBefore": 10,
}
```

### > Response
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
[
    1,
    [
        {
            "id": 3,
            "name": "Taro Net Seaweed Pck 90G",
            "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
            "description": "Rasa Seaweed ukuran 90 Gram",
            "barcode_number": "14141000032",
            "stock": 10,
            "price": 12500,
            "stockBefore": 10,
            "createdAt": "2021-05-30T09:04:50.391Z",
            "updatedAt": "2021-05-30T09:22:13.257Z"
        }
    ]
]
```

## PATCH/products/:id
### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Params
```JSON
"id": 1
```
### > Request Body

```JSON
{
 "stock" : 10
}
```

### > Response
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
[
    1,
    [
        {
            "id": 1,
            "name": "Taro Snack Net Seaweed Pck 70G",
            "image_url": "https://assets.klikindomaret.com/share/20055205/20055205_1.jpg",
            "description": "Rasa Seaweed ukuran 70 Gram",
            "barcode_number": "1414100003",
            "stock": 18,
            "price": 9500,
            "stockBefore": 5,
            "createdAt": "2021-05-30T04:16:35.484Z",
            "updatedAt": "2021-05-30T09:20:01.831Z"
        }
    ]
]
```

## DELETE/products/:id
### > Response
### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Params
```JSON
"id": 2
```
### > Request Body
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
{
    "message": "Product success to delete"
}
```

