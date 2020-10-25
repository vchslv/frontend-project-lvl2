const isValueBoolleanOrNull = (value) => (typeof value === 'boolean') || (value === null);

const formatPlain = (innerTree, path = '') => {
  const result = innerTree.reduce((acc, node) => {
    if (node.type === '+') {
      const quote = isValueBoolleanOrNull(node.value) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was added with value: ${quote}${node.value}${quote}`);
    } else if ((node.type === '-') || (node.type === '-hasChild')) {
      acc.push(`Property '${path}${node.key}' was removed`);
    } else if (node.type === 'commonAndBothhasChildren') {
      const additionalPath = `${path}${node.key}.`;
      const string = formatPlain(node.children, additionalPath);
      acc.push(string);
    } else if (node.type === '+hasChild') {
      acc.push(`Property '${path}${node.key}' was added with value: [complex value]`);
    } else if (node.type === 'difAndObject1HasChild') {
      const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From [complex value] to ${quoteForValue2}${node.value2}${quoteForValue2}`);
    } else if (node.type === 'difAndObject2HasChild') {
      const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to [complex value]`);
    } else if (node.type === 'difAndHasNotChild') {
      const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
      const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
      acc.push(`Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to ${quoteForValue2}${node.value2}${quoteForValue2}`);
    }
    return acc;
  }, []);
  return result.join('\n');
};

export default formatPlain;
