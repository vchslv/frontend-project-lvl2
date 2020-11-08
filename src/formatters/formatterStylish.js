const indentType = '  ';

const indent = (depth) => indentType.repeat(depth);

const stringify = (value, depth) => {
  if (typeof value === 'object') {
    return JSON.stringify(value, null, '    ')
      .replace(/[",]/g, '')
      .replace(/\n/g, `\n${indent(depth + 1)}`);
  }
  return value;
};

const iter = (innerTree, depth) => {
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

const depth = 1;

const formatToStylish = (innerTree) => iter(innerTree, depth);

export default formatToStylish;
