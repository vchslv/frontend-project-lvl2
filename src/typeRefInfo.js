import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const typeRefInfo = () => {
  const { program } = require('commander');
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information');

  program.parse(process.argv);
};

export default typeRefInfo;
