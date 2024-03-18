import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { assert } from 'chai'
import app from '../src/app.js'
import Contact from '../src/models/Contact.js'

const name = 'Jhon Doe'
const number = '9876543210'

describe('GET /contacts', () => {
	it(`should get a 404 type error exception with title "Not Found" and an empty list of data`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			await request(app)
				.get('/contacts')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
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
			await Contact.destroy({ truncate: true })
			await Contact.create({ name, number })
			await request(app)
				.get('/contacts')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
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
			await Contact.destroy({ truncate: true })
			await request(app)
				.get('/contacts/1')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
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
			await Contact.destroy({ truncate: true })
			const response = await Contact.create({ name, number })
			await request(app)
				.get(`/contacts/${response.id}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
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
