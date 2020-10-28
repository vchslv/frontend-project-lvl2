import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case ('yml'):
      return yaml.safeLoad(data);
    case ('yaml'):
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown file format ${format}`);
  }
};

export default parseData;
