import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from '../../middlewares/checkHeadersAndBody.js'

// routes
import ping from '../../controllers/ping.js'
import getContacts from '../../controllers/contacts/getContacts.js'
import createContact from '../../controllers/contacts/createContact.js'
import getContactById from '../../controllers/contacts/getContactById.js'
import updateContactById from '../../controllers/contacts/updateContactById.js'
import deleteContactById from '../../controllers/contacts/deleteContactById.js'
import notFound from '../../controllers/notFound.js'

router.get('/ping', ping)
router.get('/contacts', getContacts)
router.put('/contacts', checkHeadersAndBody, createContact)
router.get('/contacts/:id', getContactById)
router.patch('/contacts/:id', checkHeadersAndBody, updateContactById)
router.delete('/contacts/:id', deleteContactById)
router.all('*', notFound)

export default router
