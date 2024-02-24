import request from 'supertest'
import { assert } from 'chai'
import app from '../app.js'
import pool from '../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { MEDIA_TYPE, WRONG_MEDIA_TYPE } from '../utils/constants.js'

const name = 'Jhon Doe'
const number = '9876543210'

describe('DELETE /contacts/:id', () => {
	it(`should get a 406 type error exception with title "Not Acceptable" and null data due to unsupported or empty "Accept" header`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			const [{ insertId }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
			await request(app)
				.delete(`/contacts/${insertId}`)
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', WRONG_MEDIA_TYPE)
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

	it(`should get a 415 type error exception with title "Unsupported Media Type" and null data due to unsupported or empty "Content Type" header`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			const [{ insertId }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
			await request(app)
				.delete(`/contacts/${insertId}`)
				.set('Content-Type', WRONG_MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
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

	it(`should get a 404 type error exception with title "Not Found" and null data`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await request(app)
				.delete('/contacts/0')
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

	it(`should get a 200 response with title "OK" and null data when deleting the resource by its ID`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			const [{ insertId }] = await pool.query('INSERT INTO contacts (name, number) VALUES (?, ?)', [name, number])
			await request(app)
				.delete(`/contacts/${insertId}`)
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
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
