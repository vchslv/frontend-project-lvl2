import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const readAndParseJSON = (filePath) => JSON.parse(readFile(filePath));

const readAndParseYML = (filePath) => yaml.safeLoad(readFile(filePath));

const readAndParseINI = (filePath) => ini.parse(readFile(filePath));

const readAndParse = (filePath, extOfFile) => {
  switch (extOfFile) {
    case '.json':
      return readAndParseJSON(filePath);
    case '.yml':
      return readAndParseYML(filePath);
    case '.ini':
      return readAndParseINI(filePath);
    default:
      throw new Error('Unknown file extensions');
  }
};

export default readAndParse;
