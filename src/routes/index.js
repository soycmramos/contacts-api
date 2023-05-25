import { Router } from 'express'
const router = Router()

// middlewares
import checkHeaders from '../middlewares/check-headers-and-body.js'

import index from '../controllers/index.js'
import createContact from '../controllers/contacts.create.js'
import getContactById from '../controllers/contacts.getById.js'
import deleteContactById from '../controllers/contacts.deleteById.js'
import updateContactById from '../controllers/contacts.updateById.js'
import getContacts from '../controllers/contacts.getContacts.js'

router.get('/ping', index)
router.get('/contacts', checkHeaders, getContacts)
router.put('/contacts', checkHeaders, createContact)
router.get('/contacts/:id', checkHeaders, getContactById)
router.patch('/contacts/:id', checkHeaders, updateContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router