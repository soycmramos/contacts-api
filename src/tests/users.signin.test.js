import request from 'supertest'
import { assert } from 'chai'
import app from '../app.js'
import pool from '../db/pool.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { MEDIA_TYPE, WRONG_MEDIA_TYPE } from '../utils/constants.js'
import hashPassword from '../utils/hashPassword.js'

const email = 'example@test.com'
const password = '@123Test456?'
const data = { email, password }

describe('POST /users', () => {
	it(`should get an invalid or undefined Accept header error exception with title 'Not Acceptable' and status 406`, async () => {
		try {
			await request(app)
				.post('/users')
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
					assert.notExists(res.body.data)
				})
		} catch (error) {
			console.error(error)
		}
	})

	it(`should get an invalid or undefined Content-Type header error exception with title 'Unsupported Media Type' and status 415`, async () => {
		try {
			await request(app)
				.post('/users')
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
					assert.notExists(res.body.data)
				})
		} catch (error) {
			console.error(error)
		}
	})

	it(`should get an error exception for request body not sent, invalid or undefined with title 'Bad request' and status 400`, async () => {
		try {
			await request(app)
				.post('/users')
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
					assert.notExists(res.body.data)
				})
		} catch (error) {
			console.error(error)
		}
	})

	it(`should get an error exception for some required empty or missing field with title 'Bad Request' and status 400`, async () => {
		try {
			await request(app)
				.post('/users')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify({ email, password: '' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'error')
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.notExists(res.body.data)
				})
		} catch (error) {
			console.error(error)
		}
	})

	it(`should get an exception for not existing user with title 'Not Found' and status 404`, async () => {
		try {
			await pool.query('DELETE FROM users')
			await request(app)
				.post('/users')
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
					assert.notExists(res.body.data)
				})
		} catch (error) {
			console.error(error)
		}
	})

	it(`should get an Authorization token header, user data and a successful response with title 'OK' and status 200`, async () => {
		try {
			const hash = await hashPassword(password)
			await pool.query('DELETE FROM users')
			await pool.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`)
			await request(app)
				.post('/users')
				.set('Content-Type', MEDIA_TYPE)
				.set('Accept', MEDIA_TYPE)
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.exists(res.body.data)
					assert.isObject(res.body.data)
					assert.exists(res.headers['authorization'])
					assert.include(res.headers['authorization'], 'Bearer ')
				})
		} catch (error) {
			console.error(error)
		}
	})
})
