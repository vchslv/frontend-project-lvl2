import formatToStylish from './formatterStylish.js';
import formatToPlain from './formatterPlain.js';
import formatToJson from './formatterJson.js';

const formatOutputData = (innerTree, formatterType) => {
  switch (formatterType) {
    case 'stylish':
      return formatToStylish(innerTree);
    case 'plain':
      return formatToPlain(innerTree);
    case 'json':
      return formatToJson(innerTree);
    default:
      throw new Error(`Unknown formatter type '${formatterType}'.`);
  }
};

export default formatOutputData;
