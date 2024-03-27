import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Contact from '../../models/Contact.js'

const createContact = async (req, res) => {
	const { body, uuid, method, url } = req
	const { name, phone } = body

	let data = [name, phone]

	if (data.some(x => !Boolean(x) || !x.trim())) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'failure',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases.BAD_REQUEST,
				message: 'All parameters are required',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})
		return
	}

	data = data.map(x => x.trim())

	try {
		const response = await Contact.create({ name, phone })

		res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				code: StatusCodes.CREATED,
				title: ReasonPhrases.CREATED,
				message: 'Contact created successfully',
				data: {
					id: response.id,
					name: response.name,
					phone: response.phone
				},
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		return
	} catch (e) {
		if (e.name === 'SequelizeUniqueConstraintError') {
			res
				.status(StatusCodes.CONFLICT)
				.json({
					status: 'failure',
					code: StatusCodes.CONFLICT,
					title: ReasonPhrases.CONFLICT,
					message: 'Contact already axists',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: uuid,
						_path: `${method} ${url}`
					},
				})
			return
		}

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
					_uuid: uuid,
					_path: `${method} ${url}`
				},
			})

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default createContact
