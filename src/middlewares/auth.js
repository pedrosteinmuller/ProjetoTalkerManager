const auth = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16 || typeof authorization !== 'string') {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = auth;