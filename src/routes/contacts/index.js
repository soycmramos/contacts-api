import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from '../../middlewares/checkHeadersAndBody.js'

// routes
import getContacts from '../../controllers/contacts/getContacts.js'
import createContact from '../../controllers/contacts/createContact.js'
import getContactById from '../../controllers/contacts/getContactById.js'
import updateContactById from '../../controllers/contacts/updateContactById.js'
import deleteContactById from '../../controllers/contacts/deleteContactById.js'
import notFound from '../notFound.js'

router.get('/contacts', getContacts)
router.put('/contacts', checkHeadersAndBody, createContact)
router.get('/contacts/:id', getContactById)
router.patch('/contacts/:id', checkHeadersAndBody, updateContactById)
router.delete('/contacts/:id', deleteContactById)
router.all('*', notFound)

export default router
