const { Product } = require('../models')

class productController {
  static showAll(req, res, next) {
    Product.findAll()
      .then((products) => {
        res.status(200).json(products)
      })
      .catch((error) => {
        next(error)
      })
  }

  static findByBarcode(req, res, next) {
    Product.findOne({
      where: {
        barcode_number: req.params.barcode_number
      }
    })
      .then((product) => {
        if (product !== null) {
          res.status(200).json(product)
        }
        else {
          res.status(404).json({ message: 'Data not found'})
        }
      })
      .catch((error) => {
        next(error)
      })
  }

  static addProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      description: req.body.description,
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
      image_url: req.body.image_url,
      description: req.body.description,
      barcode_number: req.body.barcode_number,
      stock: req.body.stock,
      price: req.body.price,
      stockBefore: req.body.stockBefore
    }
    Product.update(updateProduct, {
      where: {
        id: +req.params.id
      }
    })
      .then((product) => {
        res.status(200).json({ message: 'Data has been updated'})
      })
      .catch((error) => {
        next(error)
      })
  }

  static patchUpdate(req, res, next) {
    Product.update({ stock: req.body.stock}, {
      where: {
        id: +req.params.id
      }
    })
    .then((product) => {
      res.status(200).json({ message: 'Data has been updated'})
    })
    .catch((error) => {
      next(error)
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
      next(error)
    })
  }
}

module.exports = productController