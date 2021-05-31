const router = require('express').Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const reportRoutes = require('./reportRoute')
const { authenticate } = require('../middlewares/auth.js')
const midtransRoutes = require('./midtransRoute')

router.use(userRoutes)
router.use(midtransRoutes)
router.use(authenticate)
router.use('/products', productRoutes)
router.use('/reports', reportRoutes)

module.exports = router
