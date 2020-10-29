import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import createInnerTree from './treeBuilder.js';
import formatOutputData from './formatters/index.js';

const getData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const format = path.extname(filePath).slice(1);
  return { data, format };
};

const genDiff = (filePath1, filePath2, formatterType = 'stylish') => {
  const { data: dataOfFile1, format: formatOfFile1 } = getData(filePath1);
  const { data: dataOfFile2, format: formatOfFile2 } = getData(filePath2);
  const object1 = parseData(dataOfFile1, formatOfFile1);
  const object2 = parseData(dataOfFile2, formatOfFile2);
  const internalTree = createInnerTree(object1, object2);
  return formatOutputData(internalTree, formatterType);
};

export default genDiff;
