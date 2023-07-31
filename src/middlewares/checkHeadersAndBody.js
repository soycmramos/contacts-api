import { v4 } from 'uuid'

const checkHeadersAndBody = (req, res, next) => {
	const { headers, body, url } = req
	const accept = headers['accept']
	const contentType = headers['content-type']
	const uuid = v4()

	if (!accept || accept !== 'application/json') {
		res
			.status(406)
			.json({
				status: 'error',
				code: 406,
				title: 'NOT_ACCEPTABLE',
				message: 'Media type required is not supported',
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	if (!contentType || contentType !== 'application/json') {
		res
			.status(415)
			.json({
				status: 'error',
				code: 415,
				title: 'UNSUPPORTED_MEDIA_TYPE',
				message: 'Media type submitted is not supported',
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}

	if (!Object.keys(body).length) {
		res
			.status(400)
			.json({
				status: 'error',
				code: 400,
				title: 'BAD_REQUEST',
				message: 'Request body not found',
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

export default checkHeadersAndBody
