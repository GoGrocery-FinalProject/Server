const router = require('express').Router()
const MidtransController = require('../controllers/midtransController')

router.post('/', MidtransController.pay)
router.get('/status', MidtransController.checkStatus)
router.post(
	'/payment-notification-handler',
	MidtransController.NotificationHandler
)

module.exports = router
