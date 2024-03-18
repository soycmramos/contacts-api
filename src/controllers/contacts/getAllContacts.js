import { v4 } from 'uuid'
import Contact from '../../models/Contact.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const getAllContacts = async (req, res) => {
	const { method, url } = req
	try {
		const contacts = await Contact.findAll()

		if (!contacts.length) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'failure',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'There is no contacts yet',
					data: [],
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: v4(),
						_path: `${method} ${url}`
					},
				})
			return
		}

		res
			.status(StatusCodes.OK)
			.json({
				status: 'success',
				code: StatusCodes.OK,
				title: ReasonPhrases.OK,
				message: 'Contacts found successfully',
				data: contacts.map(contact => ({
					id: contact.id,
					name: contact.name,
					number: contact.number
				})),
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: v4(),
					_path: `${method} ${url}`
				},
			})
		return
	} catch (e) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'failure',
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				message: 'Something went wrong',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: v4(),
					_path: `${method} ${url}`
				},
			})

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default getAllContacts
