import formatStylish from './format_stylish.js';
import formatPlain from './format_plain.js';

const formatOutputData = (innerTree, formatterType) => {
  switch (formatterType) {
    case 'stylish':
      return formatStylish(innerTree);
    case 'plain':
      return formatPlain(innerTree);
    default:
      throw new Error(`Error when starting the formatter '${formatterType}'.`);
  }
};

export default formatOutputData;
