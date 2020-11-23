import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const stylishResult = readFile('expected_file_stylish.txt');
const plainResult = readFile('expected_file_plain.txt');
const jsonResult = readFile('expected_file_json.json');

test('Compares JSON files and formats in stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(stylishResult);
});

test('Compares YAML files and formats in plain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toBe(plainResult);
});

test('Compares JSON file and YAML file and formats in json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'json')).toBe(jsonResult);
});
