import { Router } from 'express'
const router = Router()

// middlewares
// import checkHeadersAndBody from './../../middlewares/checkHeadersAndBody.js'
import { checkHeaders, checkBody } from '../../middlewares/checkRequest.js'

// controllers
import signup from '../../controllers/users/signup.js'
import signin from '../../controllers/users/signin.js'

router.put('/users', checkHeaders, checkBody, signup)
router.post('/users', checkHeaders, checkBody, signin)

export default router
