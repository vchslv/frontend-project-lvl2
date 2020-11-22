import _ from 'lodash';

const indent = (depth, position) => {
  switch (position) {
    case 'beforeNode':
      return '  '.repeat(2 * depth - 1);
    case ('beforeClosingBraceInNode'):
      return '  '.repeat(2 * depth - 2);
    case ('beforeNodeValue'):
      return '  '.repeat(2 * depth + 1);
    case ('beforeClosingBraceInNodeValue'):
      return '  '.repeat(2 * depth);
    default:
      throw new Error('Unknown indent position');
  }
};

const stringify = (nodeValue, depth) => {
  if (_.isPlainObject(nodeValue)) {
    const entries = Object.entries(nodeValue);
    const result = entries.map(([key, value]) => (`${indent(depth, 'beforeNodeValue')}  ${key}: ${stringify(value, depth + 1)}`));
    return `{\n${result.join('\n')}\n${indent(depth, 'beforeClosingBraceInNodeValue')}}`;
  }
  return nodeValue;
};

const iter = (innerTree, depth = 1) => {
  const result = innerTree.map((node) => {
    if (node.type === 'nested') {
      const stringChildren = iter(node.children, depth + 1);
      return `${indent(depth, 'beforeNode')}  ${node.key}: ${stringChildren}`;
    }
    if (node.type === 'unchanged') {
      return `${indent(depth, 'beforeNode')}  ${node.key}: ${stringify(node.value, depth)}`;
    }
    if (node.type === 'changed') {
      const stringForValue1 = `${indent(depth, 'beforeNode')}- ${node.key}: ${stringify(node.value1, depth)}`;
      const stringForValue2 = `${indent(depth, 'beforeNode')}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${stringForValue1}\n${stringForValue2}`;
    }
    if (node.type === 'removed') {
      return `${indent(depth, 'beforeNode')}- ${node.key}: ${stringify(node.value, depth)}`;
    }
    return `${indent(depth, 'beforeNode')}+ ${node.key}: ${stringify(node.value, depth)}`;
  });
  return `{\n${result.join('\n')}\n${indent(depth, 'beforeClosingBraceInNode')}}`;
};

const formatToStylish = (innerTree) => iter(innerTree);

export default formatToStylish;
