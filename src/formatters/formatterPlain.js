import _ from 'lodash';

const isValueBoolleanOrNull = (value) => (typeof value === 'boolean') || (value === null);

const stringify = (value) => {
  const quote = isValueBoolleanOrNull(value) ? '' : '\'';
  return `${quote}${value}${quote}`;
};

const runFormatToPlain = (innerTree, path = '') => {
  const result = innerTree.flatMap((node) => {
    if (node.type === 'nested') {
      const additionalPath = `${path}${node.key}.`;
      return runFormatToPlain(node.children, additionalPath);
    }
    if (node.type === 'removed') {
      return `Property '${path}${node.key}' was removed`;
    }
    if (node.type === 'unchanged') {
      return [];
    }
    if ((node.type === 'added') && (_.isPlainObject(node.value))) {
      return `Property '${path}${node.key}' was added with value: [complex value]`;
    }
    if (node.type === 'added') {
      return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
    }
    if ((node.type === 'changed') && _.isPlainObject(node.value1)) {
      return `Property '${path}${node.key}' was updated. From [complex value] to ${stringify(node.value2)}`;
    }
    if ((node.type === 'changed') && _.isPlainObject(node.value2)) {
      return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to [complex value]`;
    }
    return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
  });
  return result.join('\n');
};

const formatToPlain = (innerTree) => runFormatToPlain(innerTree);

export default formatToPlain;
