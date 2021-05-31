const router = require('express').Router()
const Product = require('../controllers/productController')
const { adminAuthorize } = require('../middlewares/auth.js')

router.get('/', Product.showAll) 
router.get('/:barcode_number', Product.findByBarcode)

router.post('/', adminAuthorize, Product.addProduct) 
router.put('/:id', adminAuthorize, Product.putUpdate) 
router.patch('/:id', adminAuthorize, Product.patchUpdate) 
router.delete('/:id', adminAuthorize, Product.delete)

module.exports = router