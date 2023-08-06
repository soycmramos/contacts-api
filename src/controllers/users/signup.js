import pool from '../../db/pool.js'
import hashPassword from '../../utils/hashPassword.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const signup = async (req, res) => {
	const { body, uuid, url } = req
	const { email, password } = body
	const params = [email, password]

	if (params.some(param => param === undefined || param === null || !param.length)) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'error',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases.BAD_REQUEST,
				message: 'All parameters are required',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	try {
		const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', email)

		if (rows.length) {
			res
				.status(StatusCodes.CONFLICT)
				.json({
					status: 'error',
					code: StatusCodes.CONFLICT,
					title: ReasonPhrases.CONFLICT,
					message: 'User already exists',
					data: null,
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: uuid,
						_path: url
					},
				})
			return
		}

		const hash = await hashPassword(password)
		const [{ insertId: id }] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash])

		res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				code: StatusCodes.CREATED,
				title: ReasonPhrases.CREATED,
				message: 'User created successfully',
				data: {
					user: {
						id,
						email
					}
				},
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})

		return
	} catch (e) {
		console.error(e)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'error',
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				message: 'Something went wrong',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}
}

export default signup
