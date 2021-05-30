const router = require('express').Router()
const Transaction = require('../controllers/transactionController')
const { customerAuthorize, transactionAuthorize } = require('../middlewares/auth')

router.get('/', customerAuthorize, Transaction.readTransactions)
router.get('/:id', customerAuthorize, transactionAuthorize, Transaction.readOneTransaction)
router.post('/', customerAuthorize, Transaction.createTransaction)

module.exports = router