import { createRequire } from 'module';
import runFindDiff from './finddiff.js';

const require = createRequire(import.meta.url);
const { Command } = require('commander');

const program = new Command();
const fs = require('fs');

const readAndParseFromJSON = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));

const genDiff = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      try {
        const object1 = readAndParseFromJSON(filepath1);
        const object2 = readAndParseFromJSON(filepath2);
        const result = runFindDiff(object1, object2);
        console.log(result);
      } catch (err) {
        console.log('File name or path error');
      }
    });

  program.parse(process.argv);
};

export default genDiff;
