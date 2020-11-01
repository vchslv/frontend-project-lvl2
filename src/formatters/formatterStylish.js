import _ from 'lodash';

const runFormatStylish = (innerTree, numberOfIndentRepetitions) => {
  const indentBefore = '  '.repeat(numberOfIndentRepetitions);
  const indentAfter = '  '.repeat(numberOfIndentRepetitions - 1);
  const indentForDecomposition = '  '.repeat(numberOfIndentRepetitions + 1);
  const decomposeValue = (value) => {
    if (_.isObject(value)) {
      return JSON.stringify(value, null, '    ')
        .replace(/[",]/g, '')
        .replace(/\n/g, `\n${indentForDecomposition}`);
    }
    return value;
  };

  const result = innerTree.map((node, index, array) => {
    const openCurlyBrace = (index === 0) ? '{\n' : '';
    const closeCurlyBrace = (index === (array.length - 1)) ? `\n${indentAfter}}` : '';
    if (node.type === 'nested') {
      const stringForNestedValue = runFormatStylish(node.value, numberOfIndentRepetitions + 2);
      return `${openCurlyBrace}${indentBefore}  ${node.key}: ${stringForNestedValue}${closeCurlyBrace}`;
    }
    if (node.type === 'unchanged') {
      return `${openCurlyBrace}${indentBefore}  ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    if (node.type === 'changed') {
      const stringForValue1 = `${indentBefore}- ${node.key}: ${decomposeValue(node.value1)}`;
      const stringForValue2 = `${indentBefore}+ ${node.key}: ${decomposeValue(node.value2)}`;
      return `${openCurlyBrace}${stringForValue1}\n${stringForValue2}${closeCurlyBrace}`;
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
  const numberOfIndentRepetitions = 1;
  return runFormatStylish(innerTree, numberOfIndentRepetitions);
};

export default formatToStylish;
