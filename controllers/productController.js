const { Product } = require('../models')

class productController {
  static showAll(req, res, next) {
    console.log('masuk all')
    Product.findAll()
      .then((products) => {
        res.status(200).json(products)
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
    Product.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then((product) => {
        console.log(product, 'ini masuk ke find id')
        if (product !== null) {
          res.status(200).json(product)
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

  static addProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      barcode_number: req.body.barcode_number,
      stock: req.body.stock,
      price: req.body.price,
      stockBefore: req.body.stockBefore
    }
    Product.create(newProduct)
      .then((product) => {
        res.status(201).json(product)
      })
      .catch((error) => {
        next(error)
      })
  }

  static putUpdate(req, res, next) {
    const updateProduct = {
      name: req.body.name,
      barcode_number: req.body.barcode_number,
      stock: req.body.stock,
      price: req.body.price,
      stockBefore: req.body.stockBefore
    }
    Product.update(updateProduct, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      .then((product) => {
        res.status(200).json({ message: 'Data has been updated' })
      })
      .catch((error) => {
        if (error.message) {
          next({
            code: 400,
            message: error
          })
        } else {
          next({
            code: 500,
            message: 'Internal Server Error'
          })
        }
      })
  }

  static patchUpdate(req, res, next) {
    Product.update({ stock: req.body.stock}, {
      where: {
        id: +req.params.id
      },
      returning: true //biar keliatan langsung datanya pas di hit
    })
    .then((product) => {
      res.status(200).json(product)
    })
    .catch(err => {
        next({
            code: 404,
            message: "Data not found"
        })
    })
  }

  static delete(req, res, next) {
    Product.destroy({
        where: {
            id: +req.params.id
        }
    })
    .then((product) => {
        res.status(200).json({ message: 'Product success to delete'})
    })
    .catch((error) => {
        next({
            code: 404,
            message: "Data not found"
        })
    })
  }
}

module.exports = productController