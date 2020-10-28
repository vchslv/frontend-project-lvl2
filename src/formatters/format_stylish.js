const runFormatStylish = (internalTree, numberRepeatOfIntents) => {
  const indent = '  '.repeat(numberRepeatOfIntents);
  const result = internalTree.reduce((acc, node) => {
    if ((node === '{') || (node === '}')) {
      acc.push(node);
      return acc;
    }
    if (node.type === 'added') {
      acc.push(`${indent}+ ${node.key}: ${node.value}`);
    } else if (node.type === 'removed') {
      acc.push(`${indent}- ${node.key}: ${node.value}`);
    } else if (node.type === 'common') {
      acc.push(`${indent}  ${node.key}: ${node.value}`);
    } else if (node.type === 'removedAndhadChild') {
      acc.push(`${indent}- ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'addedAndhasChild') {
      acc.push(`${indent}+ ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'updatedAndObject1HasChild') {
      acc.push(`${indent}- ${node.key}: {`);
      const string = runFormatStylish(node.value1, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
      acc.push(`${indent}+ ${node.key}: ${node.value2}`);
    } else if (node.type === 'updatedAndObject2HasChild') {
      acc.push(`${indent}- ${node.key}: ${node.value1}`);
      acc.push(`${indent}+ ${node.key}: {`);
      const string = runFormatStylish(node.value2, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'updatedAndHaveNotChild') {
      acc.push(`${indent}- ${node.key}: ${node.value1}`);
      acc.push(`${indent}+ ${node.key}: ${node.value2}`);
    } else if (node.type === 'commonAndBothHaveChild') {
      acc.push(`${indent}  ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'nodeHasChild') {
      acc.push(`${indent}  ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    }
    return acc;
  }, []);
  return result.join('\n');
};

const formatStylish = (internalTree) => {
  internalTree.unshift('{');
  internalTree.push('}');
  const numberRepeatOfIntents = 1;
  return runFormatStylish(internalTree, numberRepeatOfIntents);
};

export default formatStylish;
