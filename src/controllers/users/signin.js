import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import User from '../../models/User.js'
import signJWT from '../../utils/signJWT.js'
import bcrypt from 'bcrypt'

const signin = async (req, res) => {
	const { body, uuid, method, url } = req
	const { email, password } = body

	const data = [email, password]

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

	try {
		const user = await User.findOne({
			where: { email },
			attributes: ['id', 'email', 'password']
		})

		if (!user) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'failure',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'User not found',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: uuid,
						_path: `${method} ${url}`
					}
				})

			return
		}

		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json({
					status: 'failure',
					code: StatusCodes.UNAUTHORIZED,
					title: ReasonPhrases.UNAUTHORIZED,
					message: 'Wrong credentials',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: uuid,
						_path: `${method} ${url}`
					}
				})

			return
		}

		const token = await signJWT({
			id: user.id,
			email: user.email
		})

		res
			.status(StatusCodes.OK)
			.header('Authorization', token)
			.json({
				status: 'success',
				code: StatusCodes.OK,
				title: ReasonPhrases.OK,
				message: 'User found successfully',
				data: {
					id: user.id,
					email: user.email
				},
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				}
			})

		return
	} catch (e) {
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

export default signin
