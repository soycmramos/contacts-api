import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'

const MEDIA_TYPE = 'application/json'
const uuid = v4()

const checkHeaders = (req, res, next) => {
	const { headers, url } = req
	const accept = headers['accept']
	const contentType = headers['content-type']

	if (!accept || accept !== MEDIA_TYPE) {
		res
			.status(StatusCodes.NOT_ACCEPTABLE)
			.json({
				status: 'error',
				code: StatusCodes.NOT_ACCEPTABLE,
				title: ReasonPhrases.NOT_ACCEPTABLE,
				message: 'Media type required is not accetable',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	if (!contentType || contentType !== MEDIA_TYPE) {
		res
			.status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
			.json({
				status: 'error',
				code: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
				title: ReasonPhrases.UNSUPPORTED_MEDIA_TYPE,
				message: 'Media type submitted is not supported',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	req.uuid = uuid
	next()
	return
}

const checkBody = (req, res, next) => {
	const { body, url } = req

	if (!Object.keys(body).length) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'error',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases.BAD_REQUEST,
				message: 'Request body not found',
				data: null,
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	req.uuid = uuid
	next()
	return
}

export { checkHeaders, checkBody }
