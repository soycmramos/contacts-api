import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from '../../middlewares/checkHeadersAndBody.js'

// routes
router.put('/users', () => {})

export default router
