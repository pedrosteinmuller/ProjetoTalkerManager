const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('./utils/fsdata');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const auth = require('./middlewares/auth');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

const TALKERS_FILE_DATA = path.resolve(__dirname, './talker.json');

const generateToken = () => crypto.randomBytes(8).toString('hex');

app.get('/talker', async (_request, response) => {
  const talkers = await fs.readFile(TALKERS_FILE_DATA);
  if (talkers.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile(TALKERS_FILE_DATA);
  const talkerId = talkers.find((person) => person.id === Number(id));
  if (!talkerId) {
    return response
      .status(HTTP_NOT_FOUND_STATUS)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).send(talkerId);
});

app.post('/login', validateEmail, validatePassword, (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

app.post(
  '/talker',
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
    const { body } = request;
    const talkers = await fs.readFile(TALKERS_FILE_DATA);
    const newTalker = { id: talkers.length + 1, ...body };
    talkers.push(newTalker);
    await fs.writeFile(TALKERS_FILE_DATA, talkers);
    return response.status(HTTP_CREATED_STATUS).json(newTalker);
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
