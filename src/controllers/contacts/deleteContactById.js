import { v4 } from 'uuid'
import pool from '../../db/pool.js'

const deleteContactById = async (req, res) => {
  const { params, url } = req
  const { id } = params

  try {
    const [{ affectedRows }] = await pool.query('DELETE FROM contacts WHERE id = ?', id)

    if (!Boolean(affectedRows)) {
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

    res
      .status(200)
      .header({ 'Content-Type': 'application/json' })
      .json({
        status: 'success',
        code: 200,
        title: 'OK',
        message: 'Resource deleted successfully',
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

export default deleteContactById
