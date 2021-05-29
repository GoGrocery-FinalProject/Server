const router = require('express').Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const reportRoutes = require('./reportRoute')
const {authenticate } = require('../middlewares/auth.js')

router.use(userRoutes)
router.use(authenticate)
router.use('/products',productRoutes)
router.use('/reports',reportRoutes)

module.exports = router