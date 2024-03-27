import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import User from '../../src/models/User.js'
import hashPassword from '../../src/utils/hashPassword.js'

const email = 'test@test.example'
const password = '0t5XA21[0NFb'

describe('POST /auth/signin', () => {
	it(`should get a 406 type error exception with title "Not Acceptable" and null data due to unsupported or empty "Accept" header`, async () => {
		try {
			await request(app)
				.post('/auth/signin')
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
				.post('/auth/signin')
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

	it(`should get a 404 error exception with title "Not Found" because the user does not exist"`, async () => {
		try {
			await User.destroy({ truncate: true })
			await request(app)
				.post('/auth/signin')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email: 'xyz@xyz.example', password }))
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

	it.only(`should get a 200 response with title "OK" and the requested user with a valid JWT in "Authorization" header`, async () => {
		try {
			await User.destroy({ truncate: true })
			const hash = await hashPassword(password)
			await User.create({ email, password: hash })
			await request(app)
				.post('/auth/signin')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.OK)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.code, StatusCodes.OK)
					assert.strictEqual(res.body.title, ReasonPhrases.OK)
					assert.isObject(res.body.data)
					assert.exists(res.headers.authorization)
					assert.isString(res.headers.authorization)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
