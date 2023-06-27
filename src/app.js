import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import morgan from 'morgan'
import routes from './routes/index.js'

config()

const app = express()

// settings
app.set('port', process.env.PORT || 5000)
app.set('json spaces', 2)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

// routes
app.use(routes)

export default app
