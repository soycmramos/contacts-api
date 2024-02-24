import { v4 } from 'uuid'
import pool from '../../db/pool.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const deleteContactById = async (req, res) => {
	const { params, url } = req
	const { id } = params

	try {
		const [{ affectedRows }] = await pool.query('DELETE FROM contacts WHERE id = ?', id)

		if (!Boolean(affectedRows)) {
			res
				.status(StatusCodes.NOT_FOUND)
				.json({
					status: 'error',
					code: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					message: 'Contact not found',
					data: null,
					meta: {
						_timestamp: Math.floor(Date.now() / 1000),
						_uuid: v4(),
						_path: url
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
				message: 'Contact deleted successfully',
				data: null,
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
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
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default deleteContactById
