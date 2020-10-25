const isValueBoolleanOrNull = (value) => (typeof value === 'boolean') || (value === null);

const formatPlain = (innerTree, path = '') => {
  const result = innerTree.reduce((acc, node) => {
    if (node.type === 'added') {
      const quote = isValueBoolleanOrNull(node.value) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was added with value: ${quote}${node.value}${quote}`);
    } else if ((node.type === 'removed') || (node.type === 'removedAndhadChild')) {
      acc.push(`Property '${path}${node.key}' was removed`);
    } else if (node.type === 'commonAndBothHaveChild') {
      const additionalPath = `${path}${node.key}.`;
      const string = formatPlain(node.children, additionalPath);
      acc.push(string);
    } else if (node.type === 'addedAndhasChild') {
      acc.push(`Property '${path}${node.key}' was added with value: [complex value]`);
    } else if (node.type === 'updatedAndObject1HasChild') {
      const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From [complex value] to ${quoteForValue2}${node.value2}${quoteForValue2}`);
    } else if (node.type === 'updatedAndObject2HasChild') {
      const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to [complex value]`);
    } else if (node.type === 'updatedAndHaveNotChild') {
      const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
      const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to ${quoteForValue2}${node.value2}${quoteForValue2}`);
    }
    return acc;
  }, []);
  return result.join('\n');
};

export default formatPlain;
