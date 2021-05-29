const router = require('express').Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const reportRoutes = require('./reporttRoute')
const {authenticate } = require('../middlewares/auth.js')

router.use(userRoutes)
router.use(authenticate)
router.use('/products',productRoutes)
router.use('/report',reportRoutes)

module.exports = router