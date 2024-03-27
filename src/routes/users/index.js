import { Router } from 'express'
const router = Router()

// middlewares
import { checkHeaders, checkBody } from '../../middlewares/checkRequest.js'

// routes
import signup from '../../controllers/users/signup.js'
import signin from '../../controllers/users/signin.js'

router.put('/auth/signup', checkHeaders, checkBody, signup)
router.post('/auth/signin', checkHeaders, checkBody, signin)

export default router
