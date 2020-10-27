import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const expectedFileStylishRead = readFile('expected_file_stylish.json');
const expectedFilePlainRead = readFile('expected_file_plain.json');
const expectedFileJsonRead = readFile('expected_file_json.json');

test('Result of JSON file comparison. Paths are correct. Formatter stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedFileStylishRead);
});

test('Result of YAML file comparison. Paths are correct. Formatter stylish', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expectedFileStylishRead);
});

test('Result of JSON file comparison. Paths are correct. Formatter plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedFilePlainRead);
});

test('Result of JSON file comparison. Paths are correct. Formatter json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedFileJsonRead);
});
