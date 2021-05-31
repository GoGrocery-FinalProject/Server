const midtransClient = require('midtrans-client')
const { Transaction } = require('../models')
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

		Transaction.create({
			UserId: req.body.userId,
			products: JSON.stringify(parameter.item_details),
			order_id: parameter.transaction_details.order_id,
			totalPrice: totalPrice,
		})
			.then((res) => {
				console.log(res)
			})
			.catch(console.log)
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
				console.log(err)
			})
	}
}

module.exports = MidtransController