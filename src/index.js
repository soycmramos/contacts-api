import app from './app.js'
import pool from './conn/pool.js'
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
		pool.releaseConnection(conn)
	}
} catch (e) {
	console.error('ERROR: Database connection failed')
	throw new Error(JSON.stringify(e, null, 2))
}
