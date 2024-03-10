import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import morgan from 'morgan'
import { contactsRoutes, defaultRoutes } from './routes/index.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from './api/swagger.js'

config()

const app = express()
const specs = swaggerJSDoc(options)

// settings
app.set('port', process.env.PORT || 5000)
app.set('json spaces', 2)

// middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// routes
app.use(contactsRoutes)
app.use(defaultRoutes)

export default app
