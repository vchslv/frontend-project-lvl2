const stringify = (value) => {
  if (value === null) {
    return value;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const iter = (innerTree, path = '') => {
  const result = innerTree.flatMap((node) => {
    if (node.type === 'nested') {
      return iter(node.children, `${path}${node.key}.`);
    }
    if (node.type === 'removed') {
      return `Property '${path}${node.key}' was removed`;
    }
    if (node.type === 'unchanged') {
      return [];
    }
    if (node.type === 'added') {
      return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
    }
    return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
  });
  return result.join('\n');
};

const formatToPlain = (innerTree) => iter(innerTree);

export default formatToPlain;
