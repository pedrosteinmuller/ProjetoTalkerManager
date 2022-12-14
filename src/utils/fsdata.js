const fs = require('fs/promises');

const readFile = async (path_name) => {
  try {
    const data = await fs.readFile(path_name);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const writeFile = async (path_name, talker_data) => {
  try {
    await fs.writeFile(path_name, JSON.stringify(talker_data, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  readFile,
  writeFile,
};