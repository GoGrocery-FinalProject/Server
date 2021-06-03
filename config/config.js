const env = process.env.NODE_ENV

if (env == 'development' || env == 'test') {
	require('dotenv').config()
}

const capsENV = env.toUpperCase()

const username = process.env['DB_USERNAME_' + capsENV]
const password = process.env['DB_PASSWORD_' + capsENV]
const database = process.env['DB_NAME_' + capsENV]
const host = process.env['DB_HOST_' + capsENV]
const dialect = process.env['DB_DIALECT_' + capsENV]

module.exports = {
	development: {
		username: "postgres",
		password: "postgres",
		database: "kanjur-database",
		host: "kanjur-database.cu7k6m9tz0er.ap-southeast-1.rds.amazonaws.com",
		dialect: "postgres",
	},
	test: {
		username,
		password,
		database,
		host,
		dialect,
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		ssl: true,
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
}
