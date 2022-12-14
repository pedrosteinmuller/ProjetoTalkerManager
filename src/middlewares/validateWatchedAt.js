const validateWatchedAt = (request, response, next) => {
  const {
    talk: { watchedAt },
  } = request.body;
  const regexOfData = /\d{2}\/\d{2}\/\d{4}/gm;
  if (!watchedAt || watchedAt === '') {
    return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexOfData.test(watchedAt)) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchedAt;
