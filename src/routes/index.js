import { Router } from 'express'
const router = Router()

// middlewares
import checkHeadersAndBody from './../middlewares/checkHeadersAndBody.js'

import ping from '../controllers/ping.js'
import getContacts from '../controllers/getContacts.js'
import createContact from '../controllers/createContact.js'
import getContactById from '../controllers/getContactById.js'
import updateContactById from '../controllers/updateContactById.js'
import deleteContactById from '../controllers/deleteContactById.js'
import notFound from '../controllers/notFound.js'

router.get('/ping', ping)
router.get('/contacts', getContacts)
router.put('/contacts', checkHeadersAndBody, createContact)
router.get('/contacts/:id', getContactById)
router.patch('/contacts/:id', checkHeadersAndBody, updateContactById)
router.delete('/contacts/:id', deleteContactById)
router.all('*', notFound)

export default router