const buildExpressCallback = (controller) => {
  return async function expressCallback(req, res) {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) res.set(httpResponse.headers);
      res.type('json');
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error) {
      res.status(500).send({ error: 'An unkown error occurred.' });
    }
  };
};

module.exports = buildExpressCallback;
