const router = require('express').Router()
const Transaction = require('../controllers/transactionController')
const { adminAuthorize, customerAuthorize, transactionAuthorize } = require('../middlewares/auth')

router.get('/', adminAuthorize, Transaction.readTransactions)
router.get('/:id', customerAuthorize, transactionAuthorize, Transaction.readUserTransactions)
router.post('/', customerAuthorize, Transaction.createTransaction)

module.exports = router