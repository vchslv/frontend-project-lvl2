import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');
const yaml = require('js-yaml');

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
