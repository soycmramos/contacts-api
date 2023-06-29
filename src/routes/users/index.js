import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from './../../middlewares/checkHeadersAndBody.js'

// controllers
import signup from '../../controllers/users/signup.js'
import signin from '../../controllers/users/signin.js'
import notFound from '../notFound.js'

// router.put('/users', checkHeadersAndBody, signup)
router.put('/users', (req, res) => res.json({ msg: 'Hello world' }))
router.post('/users', checkHeadersAndBody, signin)
router.all('*', notFound)

export default router
