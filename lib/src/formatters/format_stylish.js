const runFormatStylish = (internalTree, numberRepeatOfIntents) => {
  const indent = '  '.repeat(numberRepeatOfIntents);
  const result = internalTree.reduce((acc, node) => {
    if ((node === '{') || (node === '}')) {
      acc.push(node);
      return acc;
    }
    if ((node.type === '+') || (node.type === '-') || (node.type === ' ')) {
      acc.push(`${indent}${node.type} ${node.key}: ${node.value}`);
    } else if (node.type === '-hasChild') {
      acc.push(`${indent}- ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === '+hasChild') {
      acc.push(`${indent}+ ${node.key}: {`);
      const string = runFormatStylish(node.children, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'difAndObject1HasChild') {
      acc.push(`${indent}- ${node.key}: {`);
      const string = runFormatStylish(node.value1, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
      acc.push(`${indent}+ ${node.key}: ${node.value2}`);
    } else if (node.type === 'difAndObject2HasChild') {
      acc.push(`${indent}- ${node.key}: ${node.value1}`);
      acc.push(`${indent}+ ${node.key}: {`);
      const string = runFormatStylish(node.value2, numberRepeatOfIntents + 2);
      acc.push(string);
      acc.push(`${indent}  }`);
    } else if (node.type === 'difAndHasNotChild') {
      acc.push(`${indent}- ${node.key}: ${node.value1}`);
      acc.push(`${indent}+ ${node.key}: ${node.value2}`);
    } else if (node.type === 'commonAndBothhasChildren') {
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
