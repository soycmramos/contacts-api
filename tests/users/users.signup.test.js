import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import User from '../../src/models/User.js'
import hashPassword from '../../src/utils/hashPassword.js'

const email = 'test@test.example'
const password = '0t5XA21[0NFb'

describe('PUT /auth/signup', () => {
	it(`should get a 406 type error exception with title "Not Acceptable" and null data due to unsupported or empty "Accept" header`, async () => {
		try {
			await request(app)
				.put('/auth/signup')
				.set('Content-Type', 'application/json')
				.set('Accept', 'xxx/xxx')
				.send(JSON.stringify({ email, password }))
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
				.put('/auth/signup')
				.set('Content-Type', 'xxx/xxx')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password }))
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

	it(`should get a 400 type error exception with title "Bad Request" and null data due to an unsent, invalid, or undefined request body`, async () => {
		try {
			await request(app)
				.put('/auth/signup')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({}))
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

	it(`should get a 400 type error exception with title "Bad Request" and null data due to missing or empty required field`, async () => {
		try {
			await request(app)
				.put('/auth/signup')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password: '' }))
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

	it(`should get a 201 response with title "Created" and valid data when creating a new resource in the database`, async () => {
		try {
			await User.destroy({ truncate: true })
			const hash = await hashPassword(password)
			await request(app)
				.put('/auth/signup')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password: hash }))
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

	it(`should get a 409 response with the title "Conflict" and null data due to existing resource`, async () => {
		try {
			await User.destroy({ truncate: true })
			const hash = await hashPassword(password)
			await User.create({ email, password: hash })
			await request(app)
				.put('/auth/signup')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password: hash }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CONFLICT)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.code, StatusCodes.CONFLICT)
					assert.strictEqual(res.body.title, ReasonPhrases.CONFLICT)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
