import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const typeRefInfo = () => {
  const { Command } = require('commander');
  const program = new Command();
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format');

  program.parse(process.argv);
};

export default typeRefInfo;
