import formatStylish from './formatters/format_stylish.js';

const formatOutputData = (internalTree, formatterType) => {
  switch (formatterType) {
    case 'stylish':
      return formatStylish(internalTree);
    default:
      throw new Error(`Error when starting the formatter '${formatterType}'.`);
  }
};

export default formatOutputData;
