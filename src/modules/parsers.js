import fs from 'fs';
import yaml from 'js-yaml';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const readAndParseJSON = (filePath) => JSON.parse(readFile(filePath));

const readAndParseYML = (filePath) => yaml.safeLoad(readFile(filePath));

const readAndParse = (filePath, extOfFile) => {
  switch (extOfFile) {
    case '.json':
      return readAndParseJSON(filePath);
    case '.yml':
      return readAndParseYML(filePath);
    default:
      throw new Error('Unknown file extensions');
  }
};

export default readAndParse;
