import formatToStylish from './formatterStylish.js';
import formatToPlain from './formatterPlain.js';

const formatOutputData = (innerTree, formatterType) => {
  switch (formatterType) {
    case 'stylish':
      return formatToStylish(innerTree);
    case 'plain':
      return formatToPlain(innerTree);
    case 'json':
      return JSON.stringify(innerTree);
    default:
      throw new Error(`Unknown formatter type '${formatterType}'.`);
  }
};

export default formatOutputData;
