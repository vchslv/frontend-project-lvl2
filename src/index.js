import readFile from './modules/readers.js';
import parseFile from './modules/parsers.js';
import createInnerTree from './modules/inner_tree.js';
import formatOutputData from './modules/formatters/index.js';

const formatters = ['stylish', 'plain', 'json'];

const isUnknownFormatter = (formatterType) => !formatters.includes(formatterType);

const genDiff = (filePath1, filePath2, formatterType = 'stylish') => {
  if (isUnknownFormatter(formatterType)) {
    throw new Error('Unknown formatter type');
  }
  const resultOfReadFile1 = readFile(filePath1);
  const resultOfReadFile2 = readFile(filePath2);
  const object1 = parseFile(resultOfReadFile1.content, resultOfReadFile1.ext);
  const object2 = parseFile(resultOfReadFile2.content, resultOfReadFile2.ext);
  const internalTree = createInnerTree(object1, object2);
  return formatOutputData(internalTree, formatterType);
};

export default genDiff;
