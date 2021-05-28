const router = require('express').Router()
const User = require('../controllers/userController')
const Product = require('../controllers/productController')
const {authenticate, adminAuthorize, customerAuthorize} = require('../middlewares/auth.js')


router.use('/register', User.register)
router.use('/login', User.login)

router.get('/products', Product.showAll) 
router.get('/products/:id', Product.findById)

router.use(authenticate)

router.post('/products', adminAuthorize, Product.addProduct) 
router.put('/products/:id', adminAuthorize, Product.putUpdate) 
router.patch('/products/:id', adminAuthorize, Product.patchUpdate) 
router.delete('/products/:id', adminAuthorize, Product.delete) 

module.exports = router