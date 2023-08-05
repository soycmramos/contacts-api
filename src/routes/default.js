import { v4 } from 'uuid'
import { Router } from 'express'

const router = Router()

router.get('/ping', (req, res) => {
	const { url } = req
	res
		.status(200)
		.json({
			status: 'success',
			code: 200,
			title: 'OK',
			message: 'Pong',
			data: {
				message: 'Hello world'
			},
			meta: {
				_timestamp: parseInt(Date.now() / 1000),
				_uuid: v4(),
				_path: url,
			},
		})
	return
})

router.all('*', (req, res) => {
	const { url } = req
	res
		.status(404)
		.json({
			status: 'error',
			code: 404,
			title: 'NOT_FOUND',
			message: 'Path not found',
			data: null,
			meta: {
				_timestamp: parseInt(Date.now() / 1000),
				_uuid: v4(),
				_path: url,
			},
		})
	return
})

export default router
