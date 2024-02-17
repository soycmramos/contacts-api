import pool from '../../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const createContact = async (req, res) => {
	const { body, uuid, url, user } = req
	const { name, number } = body
	const params = [name, number]

	if (params.some(p => p === undefined || p === null || !String(p.length))) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'error',
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
		console.error(e)
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'error',
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
		return
	}
}

export default createContact
