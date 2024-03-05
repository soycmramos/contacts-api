import request from 'supertest'
import { assert } from 'chai'
import app from '../app.js'
import pool from '../conn/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { MEDIA_TYPE } from '../utils/constants.js'

const name = 'Jhon Doe'
const number = '9876543210'

describe('GET /contacts', () => {
	it(`should get a 404 type error exception with title "Not Found" and an empty list of data`, async () => {
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
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
					assert.isArray(res.body.data)
					assert.lengthOf(res.body.data, 0)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 200 response with title "OK" and a list of valid data`, async () => {
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

	it(`should get a 404 error exception with title "Not Found" because the resource does not exist"`, async () => {
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
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.code, StatusCodes.NOT_FOUND)
					assert.strictEqual(res.body.title, ReasonPhrases.NOT_FOUND)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 200 response with title "OK" and an the requested resource by its ID`, async () => {
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
