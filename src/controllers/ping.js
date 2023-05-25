const ping = (req, res) => {
  const { uuid } = req
  res
    .status(200)
    .header({ 'Content-Type': 'application/json' })
    .json({
      status: 'success',
      code: 200,
      title: 'OK',
      message: 'Pong',
      meta: {
        _timestamp: parseInt(Date.now() / 1000),
        _requestId: uuid,
        _requestPath: req.baseUrl + req.path,
      },
    })
  return
}

export default ping
