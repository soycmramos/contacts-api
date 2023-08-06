import { v4 } from 'uuid'
import pool from '../../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const getContactById = async (req, res) => {
	const { params, url } = req
	const { id } = params

	try {
		const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', id)

		if (!rows.length) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'error',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'Contact not found',
					data: null,
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: v4(),
						_path: url
					},
				})
			return
		}

		const [contact] = rows

		res
			.status(StatusCodes.OK)
			.json({
				status: 'success',
				code: StatusCodes.OK,
				title: ReasonPhrases.OK,
				message: 'Contact found successfully',
				data: { contact },
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
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
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}
}

export default getContactById
