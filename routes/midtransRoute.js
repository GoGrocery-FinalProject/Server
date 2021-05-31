const router = require('express').Router()
const MidtransController = require('../controllers/midtransController')

router.post('/pay', MidtransController.pay)
router.get('/status', MidtransController.checkStatus)
//

module.exports = router
