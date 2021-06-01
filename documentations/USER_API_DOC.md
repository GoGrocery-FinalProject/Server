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
