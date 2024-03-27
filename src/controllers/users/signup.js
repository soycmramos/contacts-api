import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import User from '../../models/User.js'
import hashPassword from '../../utils/hashPassword.js'

const signup = async (req, res) => {
	const { body, uuid, method, url } = req
	const { email, password } = body

	let data = [email, password]

	if (data.some(x => !Boolean(x) || !x.trim())) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'failure',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases.BAD_REQUEST,
				message: 'All parameters are required',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})
		return
	}

	data = data.map(x => x.trim())

	try {
		const hash = await hashPassword(password)
		const response = await User.create({ email, password: hash })

		res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				code: StatusCodes.CREATED,
				title: ReasonPhrases.CREATED,
				message: 'User created successfully',
				data: {
					id: response.id,
					email: response.email,
				},
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		return
	} catch (e) {
		if (e.name === 'SequelizeUniqueConstraintError') {
			res
				.status(StatusCodes.CONFLICT)
				.json({
					status: 'failure',
					code: StatusCodes.CONFLICT,
					title: ReasonPhrases.CONFLICT,
					message: 'User already axists',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: uuid,
						_path: `${method} ${url}`
					},
				})
			return
		}

		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'failure',
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				message: 'Something went wrong',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default signup
