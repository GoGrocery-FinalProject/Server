const router = require('express').Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const reportRoutes = require('./reportRoute')
const transactionRoutes = require('./transactionRoute')
const { authenticate } = require('../middlewares/auth.js')

router.use(userRoutes)
router.use(authenticate)
router.use('/products', productRoutes)
router.use('/reports', reportRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router