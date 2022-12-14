const validateRate1 = (request, response, next) => {
  const {
    talk: { rate },
  } = request.body;
  if (rate === 0) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
module.exports = validateRate1;
