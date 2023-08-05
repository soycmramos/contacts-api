import { v4 } from 'uuid'

const MEDIA_TYPE = 'application/json'
const uuid = v4()

const checkHeaders = (req, res, next) => {
	const { headers, url } = req
	const accept = headers['accept']
	const contentType = headers['content-type']

	if (!accept || accept !== MEDIA_TYPE) {
		res
			.status(406)
			.json({
				status: 'error',
				code: 406,
				title: 'NOT_ACCEPTABLE',
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
			.status(415)
			.json({
				status: 'error',
				code: 415,
				title: 'UNSUPPORTED_MEDIA_TYPE',
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
			.status(400)
			.json({
				status: 'error',
				code: 400,
				title: 'BAD_REQUEST',
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
