const router = require('express').Router()
const Transaction = require('../controllers/transactionController')
const { adminAuthorize, customerAuthorize, transactionAuthorize } = require('../middlewares/auth')

router.get('/', adminAuthorize, Transaction.readTransactions)
router.get('/:id', customerAuthorize, transactionAuthorize, Transaction.readUserTransactions)
router.get('/orderid/:id', customerAuthorize, transactionAuthorize, Transaction.readOrderIdTransactions)
router.post('/', customerAuthorize, Transaction.createTransaction)

module.exports = router