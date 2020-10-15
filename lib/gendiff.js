import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');

const readAndParseFromJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getKeysOfObjects = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  return keysOfObject1.concat(keysOfObject2);
};

const isPropertyOfObject = (object, property) => Object
  .prototype.hasOwnProperty.call(object, property);

const genDiff = (filePath1, filePath2) => {
  try {
    const object1 = readAndParseFromJSON(filePath1);
    const object2 = readAndParseFromJSON(filePath2);
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
