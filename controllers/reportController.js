const { Report } = require('../models')

class reportController {
  static showAll(req, res, next) {
    console.log('test masuk all')
    Report.findAll()
      .then((reports) => {
        res.status(200).json(reports)
      })
      .catch((error) => {
        next({
          code: 500,
          message: "Internal Server Error"
        })
      })
  }

  static findById(req, res, next) {
    console.log(req.params, "ini paramsnya")
    Report.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then((report) => {
        console.log(report, 'ini masuk ke find id')
        if (report !== null) {
          res.status(200).json(report)
        } else {
          next({
            code: 404,
            message: 'Data not found'
          })
        }
      })
      .catch((error) => {
        next({
          code: 500,
          message: 'Internal Server Error'
        })
      })
  }
  static addReport(req, res, next) {
    const newReport = {
      products: req.body.products,
      transactions: req.body.transactions,
      income: req.body.income,
      loss: req.body.loss
    }
    Report.create(newReport)
      .then((report) => {
        res.status(201).json(report)
      })
      .catch((error) => {
        next(error)
      })
  }

  static delete(req, res, next) {
    Report.destroy({
        where: {
            id: +req.params.id
        }
    })
    .then((report) => {
        res.status(200).json({ message: 'Report success to delete'})
    })
    .catch((error) => {
        next({
            code: 404,
            message: "Data not found"
        })
    })
  }
}

module.exports = reportController