import pool from '../db/pool.js'

const createContact = async (req, res) => {
  const { body, params, uuid } = req
  const { id } = params
  const { name, number } = body

  try {
    const [{ affectedRows }] = await pool.query('UPDATE contacts SET name = IFNULL(?, name), number = IFNULL(?, number) WHERE id = ?', [name, number, id])

    if (!Boolean(affectedRows)) {
      res
        .status(404)
        .header({ 'Content-Type': 'application/json' })
        .json({
          status: 'error',
          code: 404,
          title: 'BAD_REQUEST',
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
        message: 'Resource updated successfully',
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

export default createContact
