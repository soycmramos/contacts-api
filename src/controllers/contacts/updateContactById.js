import pool from '../../db/pool.js'

const updateContactById = async (req, res) => {
	const { body, params, uuid, url } = req
	const { id } = params
	const { name, number } = body

	try {
		const [{ affectedRows }] = await pool.query('UPDATE contacts SET name = IFNULL(?, name), number = IFNULL(?, number) WHERE id = ?', [name, number, id])

		if (!Boolean(affectedRows)) {
			res
				.status(404)
				.json({
					status: 'error',
					code: 404,
					title: 'BAD_REQUEST',
					message: 'Resource not found',
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: uuid,
						_path: url
					},
				})
			return
		}

		res
			.status(200)
			.json({
				status: 'success',
				code: 200,
				title: 'OK',
				message: 'Resource updated successfully',
				data: {
					contact: {
						id,
						name,
						number
					}
				},
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})

		return
	} catch (e) {
		console.error(e)
		res
			.status(500)
			.json({
				status: 'error',
				code: 500,
				title: 'INTERNAL_SERVER_ERROR',
				message: 'Something went wrong',
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: uuid,
					_path: url
				},
			})
		return
	}
}

export default updateContactById
