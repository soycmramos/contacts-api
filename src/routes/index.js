import { Router } from 'express'
const router = Router()

import index from '../controllers/index.js'
router.get('/ping', index)

export default index