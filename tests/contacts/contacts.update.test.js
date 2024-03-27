import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import Contact from '../../src/models/Contact.js'

const name = 'Jhon Doe'
const phone = '9876543210'

describe('PATCH /contacts', () => {
	it(`should get a 406 type error exception with title "Not Acceptable" and null data due to unsupported or empty "Accept" header`, async () => {
		try {
			await request(app)
				.put('/contacts')
				.set('Content-Type', 'application/json')
				.set('Accept', 'xxx/xxx')
				.send(JSON.stringify({ name, phone }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.NOT_ACCEPTABLE)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'failure')
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
			await request(app)
				.put('/contacts')
				.set('Content-Type', 'xxx/xxx')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, phone }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.code, StatusCodes.UNSUPPORTED_MEDIA_TYPE)
					assert.strictEqual(res.body.title, ReasonPhrases.UNSUPPORTED_MEDIA_TYPE)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 404 type error exception with title "Not Found" and an empty list of data`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			await request(app)
				.patch('/contacts/0')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, phone }))
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

	it(`should get a 400 type error exception with title "Bad Request" and null data due to some empty parameter`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			const response = await Contact.create({ name, phone })
			await request(app)
				.patch(`/contacts/${response.id}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name: 'Hailee Steinfeld', phone: '' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 200 response with title "Ok" to partially update the resource (name)`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			const response = await Contact.create({ name, phone })
			await request(app)
				.patch(`/contacts/${response.id}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name: 'Hailee Steinfeld' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isObject(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 200 response with title "Ok" to partially update the resource (phone)`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			const response = await Contact.create({ name, phone })
			await request(app)
				.patch(`/contacts/${response.id}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ phone: '0000000000' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isObject(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should get a 200 response with title "Ok" to fully update the resource (name and phone)`, async () => {
		try {
			await Contact.destroy({ truncate: true })
			const response = await Contact.create({ name, phone })
			await request(app)
				.patch(`/contacts/${response.id}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name: 'Anna Kendrick', phone: '00000000000' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isObject(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
