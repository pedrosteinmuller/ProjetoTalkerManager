const fs = require('fs/promises');

const readFile = async (pathName) => {
  try {
    const data = await fs.readFile(pathName);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const writeFile = async (pathName, talkerData) => {
  try {
    await fs.writeFile(pathName, JSON.stringify(talkerData, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  readFile,
  writeFile,
};