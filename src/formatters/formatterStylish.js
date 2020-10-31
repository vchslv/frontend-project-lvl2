import _ from 'lodash';

const runFormatStylish = (innerTree, numberRepeatOfIndents) => {
  const indentBefore = '  '.repeat(numberRepeatOfIndents);
  const indentAfter = '  '.repeat(numberRepeatOfIndents - 1);
  const indentForDecomposition = '  '.repeat(numberRepeatOfIndents + 1);
  const decomposeValue = (value) => {
    if (_.isObject(value)) {
      return JSON.stringify(value, null, '    ')
        .replace(/"/g, '')
        .replace(/,/g, '')
        .replace(/\n/g, `\n${indentForDecomposition}`);
    }
    return value;
  };
  const result = innerTree.map((node, index, array) => {
    const openCurlyBrace = (index === 0) ? '{\n' : '';
    const closeCurlyBrace = (index === (array.length - 1)) ? `\n${indentAfter}}` : '';
    if (node.type === 'nested') {
      const string = runFormatStylish(node.value, numberRepeatOfIndents + 2);
      return `${openCurlyBrace}${indentBefore}  ${node.key}: ${string}${closeCurlyBrace}`;
    }
    if (node.type === 'unchanged') {
      return `${openCurlyBrace}${indentBefore}  ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    if (node.type === 'changed') {
      return `${openCurlyBrace}${indentBefore}- ${node.key}: ${decomposeValue(node.value1)}\n${indentBefore}+ ${node.key}: ${decomposeValue(node.value2)}${closeCurlyBrace}`;
    }
    if (node.type === 'removed') {
      return `${openCurlyBrace}${indentBefore}- ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    if (node.type === 'added') {
      return `${openCurlyBrace}${indentBefore}+ ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    throw new Error('Unknown formatter stylish error');
  });
  return result.join('\n');
};

const formatToStylish = (innerTree) => {
  const numberRepeatOfIndents = 1;
  return runFormatStylish(innerTree, numberRepeatOfIndents);
};

export default formatToStylish;
