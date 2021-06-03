# API DOCUMENTATION

## GET/reports

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
        "products": "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]",
        "transactions": "[{\\\"id\\\":1,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12197\\\"},{\\\"id\\\":2,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12198\\\"}]",
        "income": 50000,
        "loss": 0,
        "createdAt": "2021-05-31T09:19:14.761Z",
        "updatedAt": "2021-05-31T09:19:14.761Z"
    },
    {
    "id": 2,
    "products": "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]",
    "transactions": "[{\\\"id\\\":1,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12197\\\"},{\\\"id\\\":2,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12198\\\"}]",
    "income": 250000,
    "loss": 0,
    "updatedAt": "2021-05-31T11:11:43.097Z",
    "createdAt": "2021-05-31T11:11:43.097Z"
    }
]
```

---

## GET/reports/:id

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

### > Response
#### - Success Response (200-OK) 
note : when success
```JSON
{
    "id": 1,
    "products": "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]",
    "transactions": "[{\\\"id\\\":1,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12197\\\"},{\\\"id\\\":2,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12198\\\"}]",
    "income": 50000,
    "loss": 0,
    "createdAt": "2021-05-31T09:19:14.761Z",
    "updatedAt": "2021-05-31T09:19:14.761Z"
}
```

---
## POST/reports

### > Request Headers
```JSON
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik11a3RpIE1ldHJvbm9tIiwiZW1haWwiOiJtdWt0aWVudHV0ekBtYWlsLmNvbSIsInBob25lX251bWJlciI6IjA4MTkwODA5MTgwOCIsImlhdCI6MTYyMjM2NDcwNH0.zxkxQNG3jwFH1XacT6iig3qp-q5WQJgd23N-6B0VAQw"
}
```
### > Request Body
```JSON
{
    "products": "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]",
    "transactions": "[{\\\"id\\\":1,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12197\\\"},{\\\"id\\\":2,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12198\\\"}]",
    "income": 5000,
    "loss": 0,
    "updatedAt": "2021-05-31T11:11:43.097Z",
    "createdAt": "2021-05-31T11:11:43.097Z"
}
```
### > Response
#### - Success Response (201-Created) 
note : when successfully created
```JSON
{
    "id": 3,
    "products": "[{\\\"ProductId\\\":1,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":3500},{\\\"ProductId\\\":2,\\\"stockRecorded\\\":1,\\\"stockReal\\\":1,\\\"price\\\":4321},{\\\"ProductId\\\":3,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":24566},{\\\"ProductId\\\":4,\\\"stockRecorded\\\":5,\\\"stockReal\\\":5,\\\"price\\\":412},{\\\"ProductId\\\":5,\\\"stockRecorded\\\":4,\\\"stockReal\\\":4,\\\"price\\\":421412}]",
    "transactions": "[{\\\"id\\\":1,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12197\\\"},{\\\"id\\\":2,\\\"UserId\\\":1,\\\"Products\\\":\\\"[{ProductId:1, quantity:3},{ProductId:2, quantity:3},{ProductId:3, quantity:3}]\\\",\\\"totalPrice\\\":10500,\\\"OrderId\\\":\\\"OD101-12198\\\"}]",
    "income": 5000,
    "loss": 0,
    "updatedAt": "2021-05-31T11:11:43.097Z",
    "createdAt": "2021-05-31T11:11:43.097Z"
}
```

---

## DELETE/reports/:id
### > Response
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
#### - Success Response (200-OK) 
note : when request successfully 
```JSON
{
    "message": "Report success to delete"
}
```
