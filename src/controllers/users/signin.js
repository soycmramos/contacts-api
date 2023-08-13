import pool from '../../db/pool.js'
import bcrypt from 'bcrypt';
import signJWT from '../../utils/signJWT.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const signin = async (req, res) => {
	const { body, uuid, url } = req
	const { email, password } = body
	const params = [email, password]

	if (params.some(p => p === undefined || p === null || !p.length)) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'error',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases. BAD_REQUEST,
				message: 'All parameters are required',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
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
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'error',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'User not found',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
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
				.status(StatusCodes.UNAUTHORIZED)
				.json({
					status: 'error',
					code: StatusCodes.UNAUTHORIZED,
					title: ReasonPhrases.UNAUTHORIZED,
					message: 'Invalid password',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: uuid,
						_path: url
					},
				})
			return
		}

		const token = await signJWT(user)
		const { id, email: userEmail } = user

		res
			.status(StatusCodes.OK)
			.header({ Authorization: `Bearer ${token}` })
			.json({
				status: 'success',
				code: StatusCodes.OK,
				title: ReasonPhrases.OK,
				message: 'User found successfully',
				data: { id, email: userEmail },
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
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
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}
}

export default signin
