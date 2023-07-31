import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from '../../middlewares/checkHeadersAndBody.js'

// routes
import createContact from '../../controllers/contacts/createContact.js'
import getContacts from '../../controllers/contacts/getContacts.js'
import getContactById from '../../controllers/contacts/getContactById.js'
import updateContactById from '../../controllers/contacts/updateContactById.js'
import deleteContactById from '../../controllers/contacts/deleteContactById.js'

router.put('/contacts', checkHeadersAndBody, createContact)
router.get('/contacts', getContacts)
router.get('/contacts/:id', getContactById)
router.patch('/contacts/:id', checkHeadersAndBody, updateContactById)
router.delete('/contacts/:id', deleteContactById)

export default router
