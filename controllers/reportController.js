const { Report } = require('../models')

class reportController {
  static showAll(req, res, next) {
    Report.findAll()
      .then((reports) => {
        res.status(200).json(reports)
      })
      .catch((error) => {
        next(error)
      })
  }

  static findById(req, res, next) {
    Report.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then((report) => {
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
        next(error)
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
      if (report !== 0) {
          res.status(200).json({ message: 'Report success to delete'})
        } else {
          next({
            code: 404,
            message: 'Data not found'
          })
        }
    })
    .catch((error) => {
        next(error)
    })
  }
}

module.exports = reportController