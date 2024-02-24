import app from './app.js'
import pool from './db/pool.js'
const { NODE_ENV } = process.env

app.listen(app.get('port'), () => {
	if (NODE_ENV === 'development') {
		console.log(`Server running on http://localhost:${app.get('port')}`)
		console.log(`Try http://localhost:${app.get('port')}/ping 🚀`)
		return
	}

	console.log('Node server running...')
})

try {
	const conn = await pool.getConnection()
	if (conn) {
		console.log('Database connection successful')
	}
} catch (e) {
	console.error('Database connection failed')
	throw e
}
