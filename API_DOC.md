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

## /PAY

### > Response

### > Request Body

```JSON
{
    "gross_amount": 10000,
    "item_details": [
        {
            "id": "ITEM1",
            "name": "BONEKA",
            "price": 10000,
            "quantity": 1
        },
    ]
}
```

#### - Success Response (200-OK)

note : when request successfully

```JSON
{
    "link": "https://app.midtrans.com/snap/v2/vtweb/b32df030-bcbf-47f5-7aedf243a657"
}
```

## /PAY/STATUS

### > Response

### > Request Body

```JSON
{
    "order_id": "ORDER-101-{{timestamp}}"
}
```

#### - Success Response (200-OK)

note : when request successfully

```JSON
{
    "approval_code": "112233",
    "transaction_time": "2021-06-01 06:45:15",
    "gross_amount": "10000.00",
    "currency": "IDR",
    "order_id": "ORDER-101-1622504418",
    "payment_type": "bca_klikpay",
    "signature_key": "962a2a11a714638900f5ce836b990a533694be9d2719c9c86c92b06f05a7ae55128053ba51de1a8286131f099593523f17203601efdee4b6a54b2e3007800972",
    "status_code": "200",
    "transaction_id": "87e3c526-a186-4913-9fda-546419567921",
    "transaction_status": "settlement",
    "fraud_status": "accept",
    "settlement_time": "2021-06-01 06:45:18",
    "status_message": "Success, transaction is found",
    "merchant_id": "G348031438"
}
```
