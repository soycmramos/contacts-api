import { Router } from 'express'
const router = Router()

// middlewares
import checkHeaders from '../middlewares/check-headers-and-body.js'

import index from '../controllers/index.js'
import createContact from '../controllers/contacts.create.js'
import getContactById from '../controllers/contacts.getById.js'

router.get('/ping', index)
router.put('/contacts', checkHeaders, createContact)
router.get('/contacts/:id', checkHeaders, getContactById)

export default router