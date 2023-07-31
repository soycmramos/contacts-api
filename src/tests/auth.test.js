import request from 'supertest'
import { expect } from 'chai'
import app from '../app.js'
import pool from '../db/pool.js'

const email = 'example@test.com'
const password = '@123Test456?'
const data = { email, password }

describe('PUT /users', () => {

	it('should get an exception for Accept header invalid with title NOT_ACCEPTABLE and status 406', async () => {
		try {
			await request(app)
				.put('/users')
				.set('Content-Type', 'application/json')
				.set('Accept', '')
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(406)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('error')
					expect(res.body.title).equal('NOT_ACCEPTABLE')
				})
		} catch (error) {
			console.error(error)
		}
	})

	it('should get an exception for Content-Type header invalid with title UNSUPPORTED_MEDIA_TYPE and status 415', async () => {
		try {
			await request(app)
				.put('/users')
				.set('Content-Type', '')
				.set('Accept', 'application/json')
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(415)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('error')
					expect(res.body.title).equal('UNSUPPORTED_MEDIA_TYPE')
				})
		} catch (error) {
			console.error(error)
		}
	})

	it('should get an exception for body not sent with title BAD_REQUEST and status 400', async () => {
		try {
			await request(app)
				.put('/users')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({}))
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('error')
					expect(res.body.title).equal('BAD_REQUEST')
				})
		} catch (error) {
			console.error(error)
		}
	})

	it('should get an exception for some empty filed with title BAD_REQUEST and status 400', async () => {
		try {
			await request(app)
				.put('/users')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ email, password: '' }))
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('error')
					expect(res.body.title).equal('BAD_REQUEST')
				})
		} catch (error) {
			console.error(error)
		}
	})

	it('should create a new resource into DB and get a successful response with title CREATED and status 201', async () => {
		try {
			await pool.query('DELETE FROM users')
			await request(app)
				.put('/users')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(201)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('success')
					expect(res.body.title).equal('CREATED')
				})
		} catch (error) {
			console.error(error)
		}
	})

	it('should get an exception for already existing resource with title CONFLICT and status 409', async () => {
		try {
			await request(app)
				.put('/users')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify(data))
				.expect('Content-Type', /application\/json/)
				.expect(409)
				.expect(res => {
					expect(res.body).to.be.an('object')
					expect(res.body.status).equal('error')
					expect(res.body.title).equal('CONFLICT')
				})
		} catch (error) {
			console.error(error)
		}
	})
})
