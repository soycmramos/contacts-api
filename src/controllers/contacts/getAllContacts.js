import { v4 } from 'uuid'
import pool from '../../db/pool.js'

const getAllContacts = async (req, res) => {
	const { url } = req
	try {
		const [contacts] = await pool.query('SELECT * FROM contacts')

		if (!contacts.length) {
			res
				.status(404)
				.json({
					status: 'error',
					code: 404,
					title: 'NOT_FOUND',
					message: 'There is no contacts yet',
					meta: {
						_timestamp: parseInt(Date.now() / 1000),
						_uuid: v4(),
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
				message: 'Contacts found successfully',
				data: { contacts },
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
			.status(500)
			.json({
				status: 'error',
				code: 500,
				title: 'INTERNAL_SERVER_ERROR',
				message: 'Something went wrong',
				meta: {
					_timestamp: parseInt(Date.now() / 1000),
					_uuid: v4(),
					_path: url
				},
			})
		return
	}
}

export default getAllContacts
