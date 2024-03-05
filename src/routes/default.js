import { Router } from 'express'
import { v4 } from 'uuid'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/ping', (req, res) => {
	const { url } = req
	res
		.status(StatusCodes.OK)
		.json({
			status: 'success',
			code: StatusCodes.OK,
			title: ReasonPhrases.OK,
			message: 'Pong',
			data: null,
			meta: {
				_timestamp: Math.floor(Date.now() / 1000),
				_uuid: v4(),
				_path: url,
			},
		})
	return
})

router.all('*', (req, res) => {
	const { url } = req
	res
		.status(StatusCodes.NOT_FOUND)
		.json({
			status: 'failure',
			code: StatusCodes.NOT_FOUND,
			title: ReasonPhrases.NOT_FOUND,
			message: 'Path not found',
			data: null,
			meta: {
				_timestamp: Math.floor(Date.now() / 1000),
				_uuid: v4(),
				_path: url,
			},
		})
	return
})

export default router
