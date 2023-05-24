import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from '../middlewares/check-headers-and-body.js'

import index from '../controllers/index.js'
import createContact from '../controllers/contacts.create.js'

router.get('/ping', index)
router.put('/contacts', checkHeadersAndBody, createContact)

export default router