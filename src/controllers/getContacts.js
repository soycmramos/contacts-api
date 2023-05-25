import pool from '../db/pool.js'

const getContacts = async (req, res) => {
  const { uuid } = req
  try {
    const [contacts] = await pool.query('SELECT * FROM contacts')

    if (!contacts.length) {
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
            _requestId: uuid,
            _requestPath: req.baseUrl + req.path,
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
        message: 'Resource found successfully',
        data: { contacts },
        meta: {
          _timestamp: parseInt(Date.now() / 1000),
          _requestId: uuid,
          _requestPath: req.baseUrl + req.path,
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
          _requestId: uuid,
          _requestPath: req.baseUrl + req.path,
        },
      })
    return
  }
}

export default getContacts
