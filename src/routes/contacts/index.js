import { Router } from 'express'
const router = Router()

// middlewares
import { checkHeaders, checkBody } from '../../middlewares/checkRequest.js'
import checkJWT from '../../middlewares/checkJWT.js'

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
 *               phone:
 *                 type: string
 *                 description: Contact phone
 *             required:
 *               - name
 *               - phone
 *           example:
 *             name: Hailee Steinfeld
 *             phone: '5550000123'
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
 *                   type: phone
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

router.put('/contacts', checkJWT, checkHeaders, checkBody, createContact)
router.get('/contacts', checkHeaders, getAllContacts)
router.get('/contacts/:id', checkHeaders, getContactById)
router.patch('/contacts/:id', checkHeaders, checkBody, updateContactById)
router.delete('/contacts/:id', checkHeaders, deleteContactById)

export default router
