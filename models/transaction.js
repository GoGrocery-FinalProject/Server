'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transaction.belongsTo(models.User, { foreignKey: 'UserId' })
		}
	}
	Transaction.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			products: {
				type: DataTypes.TEXT,
				validate: {
					notEmpty: {
						args: true,
						msg: 'List of products cannot be empty',
					},
				},
			},
			order_id: {
				type: DataTypes.TEXT,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Order ID cannot be empty',
					},
				},
			},
			totalPrice: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: {
						args: true,
						msg: 'Must number',
					},
					notNegative(value) {
						if (parseInt(value) < 0) {
							throw new Error('Cannot be negative value')
						}
					},
				},
			},
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Transaction',
		}
	)
	Transaction.beforeCreate((transaction, option) => {
		transaction.status = 'unpaid'
	})
	return Transaction
}
