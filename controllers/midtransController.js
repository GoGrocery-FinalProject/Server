const midtransClient = require('midtrans-client')
const { Transaction, Product } = require('../models')
const axios = require('axios')

//flow midtrans ketika transakis dibuat inpput 2 kali post database intern dan post database midtrans
//pakai webhooks > sediain endpoint
//ada di dashboard midtrans => notifcation url di masukan endpointnya

class MidtransController {
	static pay(req, res) {
		let snap = new midtransClient.Snap({
			isProduction: false,
			serverKey: 'SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY',
			clientKey: 'SB-Mid-client-sW5AHuqn__lVIlq3',
		})

		let parameter = {
			transaction_details: {
				order_id: Math.round(new Date().getTime() / 1000),
				gross_amount: req.body.gross_amount,
			},
			item_details: req.body.item_details,
			credit_card: {
				secure: true,
			},
		}

		snap.createTransaction(parameter).then((transaction) => {
			// send transaction token && link
			let link = transaction.redirect_url
			let transactionToken = transaction.token
			let clientKey = snap.apiConfig.clientKey
			res.status(200).json({ link, transactionToken, clientKey })
		})
		.catch(err => {
			next(err)
		})
	}

	//diganti endpoint baru untuk handle notif dari midtrans (webhooks)
	static checkStatus(req, res) {
		axios({
			url: `https://api.sandbox.midtrans.com/v2/${req.body.order_id}/status`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization:
					'Basic ' +
					Buffer.from('SB-Mid-server-OkJLecqkB5bPgBQhcPsJCKWY').toString(
						'base64'
					),
			},
		})
			.then(({ data }) => {
				console.log(data)
				res.status(200).json(data)
			})
			.catch((err) => {
				next(err)
			})
	}

	static NotificationHandler(req, res, next) {
    let order_id = req.body.order_id;
    let transactionStatus = req.body.transaction_status;

    if (transactionStatus == 'settlement'){
      Transaction.findOne({ where: { order_id: order_id } })
        .then((data) => {
          if(data){
            let products = JSON.parse(data.products)
            products.forEach(el => {
              let newStock
              Product.findOne({ where: { id: el.id }})
                .then((data) => {
                  newStock = data.stock - el.quantity
                  Product.update({ stock: newStock }, {
                    where: {
                      id: +data.id
                    }
                  })
                })
            })
            Transaction.update({ status: "paid"}, { where: { order_id: order_id }})
              .then(() => {
                res.status(200).json({ ok: 'OK' })
              })
          } else {
            res.status(404).json({ status: "notfound", message: "try again 2 times"})
          }
        })
        .catch((err) => {
					console.log(err.message)
          next(err)
        })
    }
  }
}

module.exports = MidtransController
