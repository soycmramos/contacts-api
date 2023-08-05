import pool from '../../db/pool.js'
import bcrypt from 'bcrypt';
import signJWT from '../../utils/signJWT.js'

const signin = async (req, res) => {
	const { body, uuid, url } = req
	const { email, password } = body
	const params = [email, password]

	if (params.some(p => p === undefined || p === null || !p.length)) {
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

		if (!rows.length) {
			res
				.status(404)
				.json({
					status: 'error',
					code: 404,
					title: 'NOT_FOUND',
					message: 'User not found',
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: uuid,
						_path: url
					},
				})
			return
		}

		const [user] = rows
		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			res
				.status(401)
				.json({
					status: 'error',
					code: 401,
					title: 'UNAUTHORIZED',
					message: 'Invalid password',
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: uuid,
						_path: url
					},
				})
			return
		}

		const token = await signJWT(user)
		delete user.password
		delete user.createdAt

		res
			.status(200)
			.header({ Authorization: `Bearer ${token}` })
			.json({
				status: 'success',
				code: 200,
				title: 'OK',
				message: 'User found successfully',
				data: { user },
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

export default signin
