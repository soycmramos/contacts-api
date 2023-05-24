import { Router } from 'express'
const router = Router()

// middlewares
import checkHeaders from '../middlewares/check-headers-and-body.js'

import index from '../controllers/index.js'
import createContact from '../controllers/contacts.create.js'
import getContactById from '../controllers/contacts.getById.js'
import deleteContactById from '../controllers/contacts.deleteById.js'

router.get('/ping', index)
router.put('/contacts', checkHeaders, createContact)
router.get('/contacts/:id', checkHeaders, getContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router