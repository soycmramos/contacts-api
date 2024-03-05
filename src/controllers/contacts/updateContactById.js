import pool from '../../conn/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const updateContactById = async (req, res) => {
	const { body, params, uuid, url } = req
	const { name, number } = body
	const { id } = params

	const data = [
		name.trim(),
		number.trim()
	]

	if (data.some(x => x !== undefined && x !== null && !x.length)) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'failure',
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
					status: 'failure',
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

export default updateContactById
