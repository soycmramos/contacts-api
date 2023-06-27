import { v4 } from 'uuid'
import pool from '../db/pool.js'

const getContactById = async (req, res) => {
  const { params, url } = req
  const { id } = params

  try {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', id)

    if (!rows.length) {
      res
        .status(404)
        .header({ 'Content-Type': 'application/json' })
        .json({
          status: 'error',
          code: 404,
          title: 'NOT_FOUND',
          message: 'Resource not found',
          meta: {
            _timestamp: parseInt(Date.now() / 1000),
            _uuid: v4(),
            _path: url
          },
        })
      return
    }

    const [contact] = rows
    
    res
      .status(200)
      .header({ 'Content-Type': 'application/json' })
      .json({
        status: 'success',
        code: 200,
        title: 'OK',
        message: 'Resource found successfully',
        data: { contact },
        meta: {
          _timestamp: parseInt(Date.now() / 1000),
          _uuid: v4(),
          _path: url
        },
      })
    return
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .header({ 'Content-Type': 'application/json' })
      .json({
        status: 'error',
        code: 500,
        title: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
        meta: {
          _timestamp: parseInt(Date.now() / 1000),
          _uuid: v4(),
          _path: url
        },
      })
    return
  }
}

export default getContactById
