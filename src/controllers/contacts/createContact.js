import pool from '../../conn/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const createContact = async (req, res) => {
	const { body, uuid, url } = req
	const { name, number } = body
	const params = [name, number]

	if (params.some(p => p === undefined || p === null || !p.length)) {
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
					_path: url
				},
			})
		return
	}

	try {
		const [{ insertId: id }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', params)

		res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				code: StatusCodes.CREATED,
				title: ReasonPhrases.CREATED,
				message: 'Contact created successfully',
				data: { id, name, number },
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})

		return
	} catch (e) {
		if (e.code === 'ER_DUP_ENTRY') {
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
						_path: url
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
					_path: url
				},
			})

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default createContact
