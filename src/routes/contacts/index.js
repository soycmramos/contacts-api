import { Router } from 'express'
const router = Router()

// middlewares
import { checkHeaders, checkBody } from '../../middlewares/checkRequest.js'

// routes
import createContact from '../../controllers/contacts/createContact.js'
import getAllContacts from '../../controllers/contacts/getAllContacts.js'
import getContactById from '../../controllers/contacts/getContactById.js'
import updateContactById from '../../controllers/contacts/updateContactById.js'
import deleteContactById from '../../controllers/contacts/deleteContactById.js'

/**
 * @openapi
 * /contacts:
 *   put:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: Accept
 *         in: header
 *         description: Required media type
 *         required: true
 *         schema:
 *           type: string
 *           example: application/json
 *       - name: Content-Type
 *         in: header
 *         description: Submitted media type
 *         required: true
 *         schema:
 *           type: string
 *           example: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           shema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Contact name
 *               number:
 *                 type: string
 *                 description: Contact number
 *             required:
 *               - name
 *               - number
 *           example:
 *             name: Hailee Steinfeld
 *             number: '5550000123'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             shema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status response
 *                 code:
 *                   type: number
 *                   description: Code response
 *                 title:
 *                   type: string
 *                   description: HTTP reason phrase
 *                 message:
 *                   type: string
 *                   description: Message server
 *                 data:
 *                   type: object
 *                   description: Data response
 *                 meta:
 *                   type: object
 *                   description: Metadata
 *             example:
 *               status: success
 *               code: 200
 *               title: OK
 *               message: Contact created successfully
 *               data: null
 *               meta: null
 */

router.put('/contacts', checkHeaders, checkBody, createContact)
router.get('/contacts', checkHeaders, getAllContacts)
router.get('/contacts/:id', checkHeaders, getContactById)
router.patch('/contacts/:id', checkHeaders, checkBody, updateContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router
