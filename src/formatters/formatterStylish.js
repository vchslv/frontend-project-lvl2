import _ from 'lodash';

const indent = (depth) => '  '.repeat(depth);

const stringify = (nodeValue, depth) => {
  if (_.isPlainObject(nodeValue)) {
    const entries = Object.entries(nodeValue);
    const result = entries.map(([key, value]) => (`${indent(depth + 2)}  ${key}: ${stringify(value, depth + 2)}`));
    return `{\n${result.join('\n')}\n${indent(depth + 1)}}`;
  }
  return nodeValue;
};

const iter = (innerTree, depth = 1) => {
  const result = innerTree.map((node) => {
    if (node.type === 'nested') {
      const stringChildren = iter(node.children, depth + 2);
      return `${indent(depth)}  ${node.key}: ${stringChildren}`;
    }
    if (node.type === 'unchanged') {
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    }
    if (node.type === 'changed') {
      const stringForValue1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const stringForValue2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${stringForValue1}\n${stringForValue2}`;
    }
    if (node.type === 'removed') {
      return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    }
    return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
  });
  return `{\n${result.join('\n')}\n${indent(depth - 1)}}`;
};

const formatToStylish = (innerTree) => iter(innerTree);

export default formatToStylish;
