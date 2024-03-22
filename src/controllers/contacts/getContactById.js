import { v4 } from 'uuid'
import Contact from '../../models/Contact.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const getContactById = async (req, res) => {
	const { params, method, url } = req
	const { id } = params

	try {
		const contact = await Contact.findOne({
			where: { id },
			attributes: ['id', 'name', 'phone']
		})

		if (!contact) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'failure',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'Contact not found',
					data: null,
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
				message: 'Contact found successfully',
				data: contact,
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

export default getContactById
