import jwt from 'jsonwebtoken'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'

const checkAuth = (req, res, next) => {
	const { headers, url } = req

	if (!headers.hasOwnProperty('authorization')) {
		res
			.status(StatusCodes.FORBIDDEN)
			.json({
				status: 'error',
				code: StatusCodes.FORBIDDEN,
				title: ReasonPhrases.FORBIDDEN,
				message: 'Access denied',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}

	const { authorization } = headers

	if (!authorization.length) {
		res
			.status(StatusCodes.FORBIDDEN)
			.json({
				status: 'error',
				code: StatusCodes.FORBIDDEN,
				title: ReasonPhrases.FORBIDDEN,
				message: 'Access token (JWT) not provided',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}

	if (!authorization.toLowerCase().startsWith('bearer ')) {
		res
			.status(StatusCodes.FORBIDDEN)
			.json({
				status: 'error',
				code: StatusCodes.FORBIDDEN,
				title: ReasonPhrases.FORBIDDEN,
				message: 'Unspecified or invalid authentication scheme',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}

	const token = authorization.split(' ')[1]

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decodedToken
		next()
	} catch (error) {
		res
			.status(StatusCodes.FORBIDDEN)
			.json({
				status: 'error',
				code: StatusCodes.FORBIDDEN,
				title: ReasonPhrases.FORBIDDEN,
				message: error.message,
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}
}

export default checkAuth
