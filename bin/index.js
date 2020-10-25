#!/usr/bin/env node
import { createRequire } from 'module';
import genDiff from '../lib/gendiff.js';

const require = createRequire(import.meta.url);
const { Command } = require('commander');

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => {
    try {
      const result = genDiff(filePath1, filePath2, program.format);
      console.log(result);
    } catch (err) {
      console.log('File name or path error');
    }
  });

program.parse(process.argv);
