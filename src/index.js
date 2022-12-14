const express = require('express');
const path = require('path');
const fs = require('./utils/fsdata');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

const TALKERS_FILE_DATA = path.resolve(__dirname, './talker.json');

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
