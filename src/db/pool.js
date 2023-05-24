import { createPool } from 'mysql2/promise'
import path from 'path'
import { config } from 'dotenv'
config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) })

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export default pool
