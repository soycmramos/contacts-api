import { v4 } from 'uuid'
import { Router } from 'express'

const router = Router()


router.get('/', (req, res) => {
	res
		.status(200)
		.header({ 'Content-Type': 'application/json' })
		.json({
			status: 'success',
			code: 200,
			title: 'OK',
			message: 'Pong',
			meta: {
				_timestamp: parseInt(Date.now() / 1000),
				_uuid: v4(),
				_path: req.url,
			},
		})
	return
})

export default router
