import formatStylish from './format_stylish.js';
import formatPlain from './format_plain.js';
import formatJSON from './format_json.js';

const formatOutputData = (innerTree, formatterType) => {
  switch (formatterType) {
    case 'stylish':
      return formatStylish(innerTree);
    case 'plain':
      return formatPlain(innerTree);
    case 'json':
      return formatJSON(innerTree);
    default:
      throw new Error(`Error when starting the formatter '${formatterType}'.`);
  }
};

export default formatOutputData;
