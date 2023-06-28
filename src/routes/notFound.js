import { v4 } from 'uuid'

const notFound = (req, res) => {
  const { url } = req
  res
    .status(404)
    .header({ 'Content-Type': 'application/json' })
    .json({
      status: 'error',
      code: 404,
      title: 'NOT_FOUND',
      message: 'Path not found',
      meta: {
        _timestamp: parseInt(Date.now() / 1000),
        _uuid: v4(),
        _path: url,
      },
    })
  return
}

export default notFound
