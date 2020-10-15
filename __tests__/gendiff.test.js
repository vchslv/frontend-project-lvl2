import { createRequire } from 'module';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../lib/gendiff.js';

const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('paths are correct', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('expected_file.json'));
});

test('paths are not correct', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath(''))).toBe('File name or path error');
});
