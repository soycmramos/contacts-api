import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from './../../middlewares/checkHeadersAndBody.js'

// controllers
import ping from '../../controllers/ping.js'
import signup from '../../controllers/users/signup.js'
import signin from '../../controllers/users/signin.js'
import notFound from '../../controllers/notFound.js'

router.get('/ping', ping)
router.put('/auth/signup', checkHeadersAndBody, signup)
router.post('/auth/signin', checkHeadersAndBody, signin)
router.all('*', notFound)

export default router
