const notFound = (req, res) => {
  const { uuid } = req
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
        _requestId: uuid,
        _requestPath: req.baseUrl + req.path,
      },
    })
  return
}

export default notFound