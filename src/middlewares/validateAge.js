const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (!Number.isInteger(age)) {
    return response
      .status(400)
      .json({ message: 'O campo "age" deve ser um numero inteiro' });
  }

  if (age < 18) {
    return response
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validateAge;
