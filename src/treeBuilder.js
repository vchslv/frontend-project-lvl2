import _ from 'lodash';

const genInnerTree = (object1, object2) => {
  const keysOfObjects = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(keysOfObjects);
  const innerTree = sortedKeys.map((key) => {
    if (!_.has(object2, key)) {
      return { type: 'removed', key, value: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { type: 'added', key, value: object2[key] };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      const children = genInnerTree(object1[key], object2[key]);
      return { type: 'nested', key, children };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return { type: 'unchanged', key, value: object1[key] };
    }
    return {
      type: 'changed', key, value1: object1[key], value2: object2[key],
    };
  });
  return innerTree;
};

export default genInnerTree;
