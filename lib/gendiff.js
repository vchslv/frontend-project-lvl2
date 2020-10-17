import { createRequire } from 'module';
import readAndParse from './parsers.js';

const require = createRequire(import.meta.url);
const path = require('path');

const getKeysOfObjects = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  return keysOfObject1.concat(keysOfObject2);
};

const allowedExt = ['.json', '.yml', '.ini'];

const isUnknownExt = (extOfFile) => !allowedExt.includes(extOfFile);

const isPropertyOfObject = (object, property) => Object
  .prototype.hasOwnProperty.call(object, property);

const genDiff = (filePath1, filePath2) => {
  try {
    const extOfFile1 = path.extname(filePath1);
    const extOfFile2 = path.extname(filePath2);
    if (extOfFile1 !== extOfFile2) {
      return 'File extensions should not be different';
    }
    if (isUnknownExt(extOfFile1) && isUnknownExt(extOfFile2)) {
      return 'Unknown file extensions';
    }
    const object1 = readAndParse(filePath1, extOfFile1);
    const object2 = readAndParse(filePath2, extOfFile2);
    const keysOfObjects = getKeysOfObjects(object1, object2);
    const result = keysOfObjects.filter((item, index) => keysOfObjects.indexOf(item) === index)
      .sort()
      .reduce((acc, key) => {
        if (isPropertyOfObject(object1, key) && !isPropertyOfObject(object2, key)) {
          acc.push(`  - ${key}: ${object1[key]}`);
        } else if (!isPropertyOfObject(object1, key) && isPropertyOfObject(object2, key)) {
          acc.push(`  + ${key}: ${object2[key]}`);
        } else if (isPropertyOfObject(object1, key) && isPropertyOfObject(object2, key)) {
          if (object1[key] === object2[key]) {
            acc.push(`    ${key}: ${object1[key]}`);
          } else if (object1[key] !== object2[key]) {
            acc.push(`  - ${key}: ${object1[key]}`);
            acc.push(`  + ${key}: ${object2[key]}`);
          }
        }
        return acc;
      }, ['{']);
    result.push('}\n');
    return result.join('\n');
  } catch (err) {
    return 'File name or path error';
  }
};

export default genDiff;
