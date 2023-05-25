import { Router } from 'express'
const router = Router()

// middlewares
import checkHeaders from '../middlewares/check-headers.js'

import index from '../controllers/index.js'
import getContacts from '../controllers/getContacts.js'
import createContact from '../controllers/createContact.js'
import getContactById from '../controllers/getContactById.js'
import updateContactById from '../controllers/updateContactById.js'
import deleteContactById from '../controllers/deleteContactById.js'

router.get('/ping', index)
router.get('/contacts', checkHeaders, getContacts)
router.put('/contacts', checkHeaders, createContact)
router.get('/contacts/:id', checkHeaders, getContactById)
router.patch('/contacts/:id', checkHeaders, updateContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router