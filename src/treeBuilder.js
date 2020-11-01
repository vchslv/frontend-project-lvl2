import _ from 'lodash';

const genInnerTree = (object1, object2) => {
  const keysOfObjects = _.union(_.keys(object1), _.keys(object2)).sort();
  const innerTree = keysOfObjects.map((key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        const nestedValue = genInnerTree(object1[key], object2[key]);
        return { type: 'nested', key, value: nestedValue };
      }
      if (object1[key] === object2[key]) {
        return { type: 'unchanged', key, value: object1[key] };
      }
      if (object1[key] !== object2[key]) {
        return {
          type: 'changed', key, value1: object1[key], value2: object2[key],
        };
      }
    }
    if (_.has(object1, key) && !_.has(object2, key)) {
      return { type: 'removed', key, value: object1[key] };
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return { type: 'added', key, value: object2[key] };
    }
    throw new Error('Unknown tree builder error');
  });
  return innerTree;
};

export default genInnerTree;
