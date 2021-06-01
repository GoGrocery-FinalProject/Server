# API DOCUMENTATION

## POST/PAY

### > Response

### > Request Body

```JSON
{
    "userId": 1,
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
    "link": "https://app.midtrans.com/snap/v2/vtweb/b32df030-bcbf-47f5-7aedf243a657",
    "order_id": "ORDER-101-93132131"
}
```

## GET/PAY/STATUS

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