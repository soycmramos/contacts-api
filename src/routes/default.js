import { Router } from 'express'
import { v4 } from 'uuid'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const router = Router()

/**
 * @openapi
 * /health:
 *   head:
 *     description: Test API health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns a successful response
 */
router.head('/health', (req, res) => res.send(StatusCodes.OK))

router.get('/', (req, res) => res.redirect('/api-docs'))

router.all('*', (req, res) => {
	const { method, url } = req
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
				_path: `${method} ${url}`,
			},
		})
	return
})

export default router
