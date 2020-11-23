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
    switch (node.type) {
      case 'nested':
        return iter(node.children, `${path}${node.key}.`);
      case 'removed':
        return `Property '${path}${node.key}' was removed`;
      case 'unchanged':
        return [];
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unknown node type '${node.type}'`);
    }
  });
  return result.join('\n');
};

const formatToPlain = (innerTree) => iter(innerTree);

export default formatToPlain;
