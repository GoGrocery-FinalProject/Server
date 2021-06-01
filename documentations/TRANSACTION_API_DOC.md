# API DOCUMENTATION

## GET/transactions

### > Request Headers

```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjUzODUwOH0.mKp0o3MZM37QMcaZS0G_6i8cHTYF31cFu6cYWpCU5Q0"
}
```

### > Request Body

### > Response

#### - Success Response (200-OK)

note : when success

```JSON
{
    "transactions": [
        {
            "id": 1,
            "UserId": 2,
            "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"2,\\\"price\\\":3500\\\"}]",
            "order_id": "OD101-12197",
            "totalPrice": 20000,
            "createdAt": "2021-06-01T09:05:01.607Z"
        },
        {
            "id": 2,
            "UserId": 2,
            "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"3,\\\"price\\\":5250\\\"}]",
            "order_id": "OD101-12197",
            "totalPrice": 20000,
            "createdAt": "2021-06-01T09:06:38.054Z"
        }
    ]
}
```

---

## GET/products/:id

### > Request Headers

```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkJlbmlkaWN0aXZpdHkiLCJlbWFpbCI6ImJlbmlkaWN0aXZpdHlAbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIwODE5MDgwOTE4MDgiLCJpYXQiOjE2MjI1MzgxNDh9.ZoqfM0YeUjRiiqw4U1bc_Mwzm0pTnmFVjfgK2khCjdc"
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
    "transactions": [
        {
            "id": 1,
            "UserId": 2,
            "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"2,\\\"price\\\":3500\\\"}]",
            "order_id": "OD101-12197",
            "totalPrice": 20000,
            "createdAt": "2021-06-01T09:05:01.607Z"
        },
        {
            "id": 2,
            "UserId": 2,
            "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"3,\\\"price\\\":5250\\\"}]",
            "order_id": "OD101-12197",
            "totalPrice": 20000,
            "createdAt": "2021-06-01T09:06:38.054Z"
        }
    ]
}
```

---

## POST/transactions

### > Request Headers

```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkJlbmlkaWN0aXZpdHkiLCJlbWFpbCI6ImJlbmlkaWN0aXZpdHlAbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIwODE5MDgwOTE4MDgiLCJpYXQiOjE2MjI1MzgxNDh9.ZoqfM0YeUjRiiqw4U1bc_Mwzm0pTnmFVjfgK2khCjdc"
}
```

### > Request Body

```JSON
{
    "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"2,\\\"price\\\":3500\\\"}]",
    "order_id": "OD101-12197",
    "totalPrice": 20000
}
```

### > Response

#### - Success Response (201-Created)

note : when successfully created

```JSON
{
    "id": 1,
    "UserId": 2,
    "products": "[{\\\"ProductId:\\\"1,\\\"quantity:\\\"2,\\\"price\\\":3500\\\"}]",
    "order_id": "OD101-12197",
    "totalPrice": 20000,
    "status": "unpaid"
}
```

---
