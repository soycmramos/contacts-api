import app from './app.js'
import pool from './db/pool.js'

app.listen(app.get('port'), () => { 
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on http://localhost:${app.get('port')}`)
    console.log(`Try http://localhost:${app.get('port')}/ping 🚀`)
    return
  }

  console.log('Node server running...')
})

try {
  await pool.getConnection()
  console.log('DB is connected')
} catch (e) {
  console.error(e)
}