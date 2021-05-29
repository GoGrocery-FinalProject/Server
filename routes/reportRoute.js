const router = require('express').Router()
const Report = require('../controllers/reportController')
const { adminAuthorize } = require('../middlewares/auth.js')


router.get('/', adminAuthorize, Report.showAll) 
router.get('/:id', adminAuthorize, Report.findById)
router.post('/', adminAuthorize, Report.addReport) 
router.delete('/:id', adminAuthorize, Report.delete)

module.exports = router