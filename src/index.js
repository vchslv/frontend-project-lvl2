import path from 'path';
import readAndParse from './modules/parsers.js';
import createInnerTree from './modules/inner_tree.js';
import formatOutputData from './modules/formatters/index.js';

const allowedExt = ['.json', '.yml'];

const formatters = ['stylish', 'plain', 'json'];

const isUnknownExt = (extOfFile) => !allowedExt.includes(extOfFile);

const isUnknownFormatter = (formatterType) => !formatters.includes(formatterType);

const genDiff = (filePath1, filePath2, formatterType = 'stylish') => {
  try {
    const extOfFile1 = path.extname(filePath1);
    const extOfFile2 = path.extname(filePath2);
    if (extOfFile1 !== extOfFile2) {
      return 'File extensions should not be different';
    }
    if (isUnknownExt(extOfFile1) && isUnknownExt(extOfFile2)) {
      return 'Unknown file extensions';
    }
    if (isUnknownFormatter(formatterType)) {
      return 'Unknown formatter type';
    }
    const object1 = readAndParse(filePath1, extOfFile1);
    const object2 = readAndParse(filePath2, extOfFile2);
    const internalTree = createInnerTree(object1, object2);
    return formatOutputData(internalTree, formatterType);
  } catch (err) {
    return 'File name or path error';
  }
};

export default genDiff;
