import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import pool from './db/pool.js'
import routes from './routes/index.js'

config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) })

const app = express()

// settings
app.set('port', process.env.PORT || 5000)
app.set('basepath', '/v1')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev')) // just for dev environment

// routes
app.use(app.get('basepath'), routes)

app.listen(app.get('port'), async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on http://localhost:${app.get('port')}`)
    console.log(`Try http://localhost:${app.get('port')}${app.get('basepath')}/ping 🚀`)
    return
  }

  console.log(`Node server running...`)
  return
})

try {
  await pool.getConnection()
  console.log('DB is connected')
} catch (e) {
  console.error(e)
}