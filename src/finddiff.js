const runFindDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const allKeys = keys1.concat(keys2);
  const result = allKeys.filter((item, index) => allKeys.indexOf(item) === index)
    .sort()
    .reduce((acc, key) => {
      if (object1.hasOwnProperty(key) && !object2.hasOwnProperty(key)) {
        acc.push(`  - ${key}: ${object1[key]}`);
      } else if (!object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
        acc.push(`  + ${key}: ${object2[key]}`);
      } else if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
        if (object1[key] === object2[key]) {
          acc.push(`    ${key}: ${object1[key]}`);
        } else if (object1[key] !== object2[key]) {
          acc.push(`  - ${key}: ${object1[key]}`);
          acc.push(`  + ${key}: ${object2[key]}`);
        }
      }
      return acc;
    }, ['{']);
  result.push('}');
  return result.join('\n');
};

export default runFindDiff;
