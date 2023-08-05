import pool from '../../db/pool.js'
import hashPassword from '../../utils/hashPassword.js'

const signup = async (req, res) => {
	const { body, uuid, url } = req
	const { email, password } = body
	const params = [email, password]

	if (params.some(param => param === undefined || param === null || !param.length)) {
		res
			.status(400)
			.json({
				status: 'error',
				code: 400,
				title: 'BAD_REQUEST',
				message: 'All parameters are required',
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
				.status(409)
				.json({
					status: 'error',
					code: 409,
					title: 'CONFLICT',
					message: 'User already exists',
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
			.status(201)
			.json({
				status: 'success',
				code: 201,
				title: 'CREATED',
				message: 'User created successfully',
				data: { user: { id, email } },
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
			.status(500)
			.json({
				status: 'error',
				code: 500,
				title: 'INTERNAL_SERVER_ERROR',
				message: 'Something went wrong',
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
