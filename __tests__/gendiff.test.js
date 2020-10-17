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

test('Result of JSON file comparison. Paths are correct', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('expected_file.json'));
});

test('Result of YAML file comparison. Paths are correct', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(readFile('expected_file.yml'));
});

test('Result of INI file comparison. Paths are correct', () => {
  expect(genDiff(getFixturePath('file1.ini'), getFixturePath('file2.ini'))).toBe(readFile('expected_file.ini'));
});

test('File name or path error', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file3.json'))).toBe('File name or path error');
});

test('File extensions don\'t match', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toBe('File extensions should not be different');
});

test('Unknown file extensions', () => {
  expect(genDiff(getFixturePath('file1.txt'), getFixturePath('file2.txt'))).toBe('Unknown file extensions');
});
