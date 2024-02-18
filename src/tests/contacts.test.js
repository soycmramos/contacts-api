import request from 'supertest'
import { assert } from 'chai'
import app from '../app.js'
import pool from '../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { MEDIA_TYPE, WRONG_MEDIA_TYPE } from '../utils/constants.js'

const name = 'Jhon Doe'
const number = '9876543210'
const data = { name, number }

/* PUT /contacts */
describe('PUT /contacts', () => {
	it(`should get an invalid or undefined Accept header error exception with title 'Not Acceptable', status 406 and null data`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', WRONG_MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.NOT_ACCEPTABLE)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.NOT_ACCEPTABLE)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_ACCEPTABLE)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get an invalid or undefined Content-Type header error exception with title 'Unsupported Media Type', status 415 and null data`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', WRONG_MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.UNSUPPORTED_MEDIA_TYPE)
					assert.strictEqual(res.body.title, ReasonPhrases.UNSUPPORTED_MEDIA_TYPE)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get an error exception for request body not sent, invalid or undefined with title 'Bad request', status 400 and null data`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify({}))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`That should get an error exception for some required empty or missing field with title 'Bad Request', status 400 and null data`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify({ name, number: '' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should create a new resource in the database and get a success response with title 'Created' and status 201`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await request(app)
				.put('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CREATED)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.CREATED)
					assert.strictEqual(res.body.title, ReasonPhrases.CREATED)
					assert.exists(res.body.data)
					assert.isObject(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get an exception for already existing contact with title 'Conflict', status 409 and null data`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CONFLICT)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.CONFLICT)
					assert.strictEqual(res.body.title, ReasonPhrases.CONFLICT)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})

/* GET /contacts */
describe('GET /contacts', () => {
	it(`should get an empty list of contacts`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await request(app)
				.get('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.NOT_FOUND)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
					assert.isArray(res.body.data)
					assert.lengthOf(res.body.data, 0)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get an list of contacts`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
			await request(app)
				.get('/contacts')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isArray(res.body.data)
					assert.operator(res.body.data.length, '>', 0)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get an exception for contact not found`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await request(app)
				.get('/contacts/1')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.NOT_FOUND)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get the requested contact`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			const [{ insertId }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
			await request(app)
				.get(`/contacts/${insertId}`)
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isObject(res.body.data)
					assert.isString(res.body.data.name)
					assert.isString(res.body.data.number)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})

/* PATCH /contacts */
describe('PATCH /contacts', () => {
	it(`should get an exception for contact not found`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await request(app)
				.patch('/contacts/1')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.NOT_FOUND)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	// it(`should only the name of the contact`, async () => {
	// 	try {
	// 		await pool.query('DELETE FROM contacts')
	// 		await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
	// 		const [{ insertId }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
	// 		await request(app)
	// 			.patch(`/contacts/${insertId}`)
	// 			.set('Content-Type', MEDIA_TYPE)
	// 			.set('Accept', MEDIA_TYPE)
	// 			.send(JSON.stringify({ name: 'Janet' }))
	// 			.expect('Content-Type', /application\/json/)
	// 			.expect(StatusCodes.NOT_FOUND)
	// 			.expect(res => {
	// 				assert.exists(res.body)
	// 				assert.isObject(res.body)
	// 				assert.strictEqual(res.body.status, 'error')
	// 				assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
	// 				assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
	// 				assert.isNull(res.body.data)
	// 			})
	// 	} catch (error) {
	// 		throw Error(error)
	// 	}
	// })
});
