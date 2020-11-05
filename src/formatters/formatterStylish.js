import _ from 'lodash';

const space = '  ';

const runFormatStylish = (innerTree, spacesCount) => {
  const indentBeforeKey = space.repeat(spacesCount);
  const indentBeforeCloseCurlyBrace = space.repeat(spacesCount - 1);
  const decomposeValue = (value) => {
    const indentForDecomposition = space.repeat(spacesCount + 1);
    if (_.isObject(value)) {
      return JSON.stringify(value, null, '    ')
        .replace(/[",]/g, '')
        .replace(/\n/g, `\n${indentForDecomposition}`);
    }
    return value;
  };
  const result = innerTree.map((node, index, array) => {
    const openCurlyBrace = (index === 0) ? '{\n' : '';
    const closeCurlyBrace = (index === (array.length - 1)) ? `\n${indentBeforeCloseCurlyBrace}}` : '';
    if (node.type === 'nested') {
      const stringForNestedValue = runFormatStylish(node.children, spacesCount + 2);
      return `${openCurlyBrace}${indentBeforeKey}  ${node.key}: ${stringForNestedValue}${closeCurlyBrace}`;
    }
    if (node.type === 'unchanged') {
      return `${openCurlyBrace}${indentBeforeKey}  ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    if (node.type === 'changed') {
      const stringForValue1 = `${indentBeforeKey}- ${node.key}: ${decomposeValue(node.value1)}`;
      const stringForValue2 = `${indentBeforeKey}+ ${node.key}: ${decomposeValue(node.value2)}`;
      return `${openCurlyBrace}${stringForValue1}\n${stringForValue2}${closeCurlyBrace}`;
    }
    if (node.type === 'removed') {
      return `${openCurlyBrace}${indentBeforeKey}- ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
    }
    return `${openCurlyBrace}${indentBeforeKey}+ ${node.key}: ${decomposeValue(node.value)}${closeCurlyBrace}`;
  });
  return result.join('\n');
};

const spacesCount = 1;

const formatToStylish = (innerTree) => runFormatStylish(innerTree, spacesCount);

export default formatToStylish;
