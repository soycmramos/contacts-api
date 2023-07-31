import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from './../../middlewares/checkHeadersAndBody.js'

// controllers
import signup from '../../controllers/users/signup.js'
import signin from '../../controllers/users/signin.js'

router.put('/users', checkHeadersAndBody, signup)
router.post('/users', checkHeadersAndBody, signin)

export default router
