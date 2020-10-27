import yaml from 'js-yaml';

const parseJSON = (content) => JSON.parse(content);

const parseYML = (content) => yaml.safeLoad(content);

const parseFile = (content, ext) => {
  switch (ext) {
    case '.json':
      return parseJSON(content);
    case '.yml':
      return parseYML(content);
    default:
      throw new Error('Error of parsing');
  }
};

export default parseFile;
