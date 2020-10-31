import _ from 'lodash';

const isValueBoolleanOrNull = (value) => (typeof value === 'boolean') || (value === null);

const formatToPlain = (innerTree, path = '') => {
  const result = innerTree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      if (node.type === 'nested') {
        const additionalPath = `${path}${node.key}.`;
        return formatToPlain(node.value, additionalPath);
      }
      if (node.type === 'changed') {
        if (_.isObject(node.value1) && !_.isObject(node.value2)) {
          const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
          return `Property '${path}${node.key}' was updated. From [complex value] to ${quoteForValue2}${node.value2}${quoteForValue2}`;
        }
        if (!_.isObject(node.value1) && _.isObject(node.value2)) {
          const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
          return `Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to [complex value]`;
        }
        const quoteForValue1 = isValueBoolleanOrNull(node.value1) ? '' : '\'';
        const quoteForValue2 = isValueBoolleanOrNull(node.value2) ? '' : '\'';
        return `Property '${path}${node.key}' was updated. From ${quoteForValue1}${node.value1}${quoteForValue1} to ${quoteForValue2}${node.value2}${quoteForValue2}`;
      }
      if (node.type === 'removed') {
        return `Property '${path}${node.key}' was removed`;
      }
      if (node.type === 'added') {
        if (_.isObject(node.value)) {
          return `Property '${path}${node.key}' was added with value: [complex value]`;
        }
        const quote = isValueBoolleanOrNull(node.value) ? '' : '\'';
        return `Property '${path}${node.key}' was added with value: ${quote}${node.value}${quote}`;
      }
      throw new Error('Unknown formatter plain error');
    });
  return result.join('\n');
};

export default formatToPlain;
