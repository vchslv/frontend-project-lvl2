import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => (`${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`));
  return `{\n${result.join('\n')}\n${indent(depth + 1, 2)}${indent(depth + 1, 2)}}`;
};

const iter = (innerTree, depth = 1) => {
  const result = innerTree.map((node) => {
    switch (node.type) {
      case 'nested': {
        const stringChildren = iter(node.children, depth + 1);
        return `${indent(depth)}  ${node.key}: ${stringChildren}`;
      }
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed': {
        const stringForValue1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
        const stringForValue2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
        return `${stringForValue1}\n${stringForValue2}`;
      }
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown node type '${node.type}'`);
    }
  });
  return `{\n${result.join('\n')}\n${indent(depth, 2)}${indent(depth, 2)}}`;
};

const formatToStylish = (innerTree) => iter(innerTree);

export default formatToStylish;
