const express = require('express');
const fs = require('fs/promises');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKERS_FILE_DATA = './talker.json';

app.get('/talker', async (_request, response) => {
  const talkers = JSON.parse(await fs.readFile(TALKERS_FILE_DATA));
  if(talkers.length === 0){
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
