const router = require('express').Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const {authenticate } = require('../middlewares/auth.js')

router.use(userRoutes)
router.use(authenticate)
router.use('/products',productRoutes)

module.exports = router