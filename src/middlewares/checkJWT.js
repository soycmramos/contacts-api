import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

const checkJWT = async (req, res, next) => {
	const { authorization } = req.headers
	const { uuid, method, url } = req

	if (!authorization) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({
				status: 'failure',
				code: StatusCodes.UNAUTHORIZED,
				title: ReasonPhrases.UNAUTHORIZED,
				message: 'Authorization header not supplied',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		return
	}

	if (!authorization.startsWith('Bearer ')) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({
				status: 'failure',
				code: StatusCodes.UNAUTHORIZED,
				title: ReasonPhrases.UNAUTHORIZED,
				message: 'Invalid authorization scheme',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		return
	}

	const token = authorization.split(' ')[1]

	try {
		const decodedJWT = await jwt.verify(token, process.env.JWT_SECRET)
		req.user = decodedJWT
		next()
		return
	} catch (e) {
		res
			.status(StatusCodes.UNAUTHORIZED)
			.json({
				status: 'failure',
				code: StatusCodes.UNAUTHORIZED,
				title: ReasonPhrases.UNAUTHORIZED,
				message: `${e.name}: ${e.message}`,
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		return
	}
}

export default checkJWT
