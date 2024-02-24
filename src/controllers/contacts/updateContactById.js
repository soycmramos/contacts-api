import pool from '../../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const updateContactById = async (req, res) => {
	const { body, params, uuid, url } = req
	const { id } = params
	const { name, number } = body

	if ([name, number].some(p => p !== undefined && p !== null && !p.length)) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'error',
				code: StatusCodes.BAD_REQUEST,
				title: ReasonPhrases.BAD_REQUEST,
				message: 'Invalid empty value',
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
		const [{ affectedRows }] = await pool.query('UPDATE contacts SET name = IFNULL(?, name), number = IFNULL(?, number) WHERE id = ?', [name, number, id])

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
						_uuid: uuid,
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
				message: 'Contact updated successfully',
				data: { id, name, number },
				meta: {
					_timestamp: Math.floor(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})

		return
	} catch (e) {
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

		throw new Error(JSON.stringify(e, null, 2))
	}
}

export default updateContactById
