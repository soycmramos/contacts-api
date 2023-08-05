import { Router } from 'express'
const router = Router()

// middlewares
// import checkHeadersAndBody from '../../middlewares/checkHeadersAndBody.js'
import { checkHeaders, checkBody } from '../../middlewares/checkRequest.js'

// routes
import createContact from '../../controllers/contacts/createContact.js'
import getAllContacts from '../../controllers/contacts/getAllContacts.js'
import getContactById from '../../controllers/contacts/getContactById.js'
import updateContactById from '../../controllers/contacts/updateContactById.js'
import deleteContactById from '../../controllers/contacts/deleteContactById.js'

router.put('/contacts', checkHeaders, checkBody, createContact)
router.get('/contacts', checkHeaders, getAllContacts)
router.get('/contacts/:id', checkHeaders, getContactById)
router.patch('/contacts/:id', checkHeaders, checkBody, updateContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router
