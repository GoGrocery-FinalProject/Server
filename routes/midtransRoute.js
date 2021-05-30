const router = require('express').Router()
const MidtransController = require('../controllers/midtransController')

router.post('/pay', MidtransController.pay)

module.exports = router
