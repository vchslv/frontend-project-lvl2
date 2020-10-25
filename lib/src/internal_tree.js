import _ from 'lodash';

const getKeysOfObjects = (object1, object2) => {
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  const keysOfObjects = _.uniq(keysOfObject1.concat(keysOfObject2)).sort();
  return keysOfObjects;
};

const isValueObject = (object, key) => Object.prototype.toString.call(object[key]) === '[object Object]';

const decomposeObject = (object) => {
  const keysOfObject = Object.keys(object);
  const innerTree = keysOfObject.reduce((acc, key) => {
    const node = {};
    node.key = key;
    if (isValueObject(object, key)) {
      node.type = 'nodeHasChild';
      node.children = decomposeObject(object[key]);
    } else {
      node.type = ' ';
      node.value = object[key];
    }
    acc.push(node);
    return acc;
  }, []);
  return innerTree;
};

const createInnerTree = (object1, object2) => {
  const keysOfObjects = getKeysOfObjects(object1, object2);
  const innerTree = keysOfObjects.reduce((acc, key) => {
    const node = {};
    node.key = key;
    if (_.has(object1, key) && _.has(object2, key) && isValueObject(object1, key)
    && isValueObject(object2, key)) {
      node.type = 'commonAndBothhasChildren';
      node.children = createInnerTree(object1[key], object2[key]);
    } else if (_.has(object1, key) && _.has(object2, key) && (object1[key] === object2[key])) {
      node.type = ' ';
      node.value = object1[key];
    } else if (_.has(object1, key) && _.has(object2, key) && (object1[key] !== object2[key])
    && isValueObject(object1, key) && !isValueObject(object2, key)) {
      node.type = 'difAndObject1HasChild';
      node.value1 = decomposeObject(object1[key]);
      node.value2 = object2[key];
    } else if (_.has(object1, key) && _.has(object2, key) && (object1[key] !== object2[key])
    && !isValueObject(object1, key) && isValueObject(object2, key)) {
      node.type = 'difAndObject2HasChild';
      node.value1 = object1[key];
      node.value2 = decomposeObject(object2[key]);
    } else if (_.has(object1, key) && _.has(object2, key) && (object1[key] !== object2[key])
    && !isValueObject(object1, key) && !isValueObject(object1, key)) {
      node.type = 'difAndHasNotChild';
      node.value1 = object1[key];
      node.value2 = object2[key];
    } else if (_.has(object1, key) && !_.has(object2, key) && isValueObject(object1, key)) {
      node.type = '-hasChild';
      node.children = decomposeObject(object1[key]);
    } else if (_.has(object1, key) && !_.has(object2, key) && !isValueObject(object1, key)) {
      node.type = '-';
      node.value = object1[key];
    } else if (!_.has(object1, key) && _.has(object2, key) && isValueObject(object2, key)) {
      node.type = '+hasChild';
      node.children = decomposeObject(object2[key]);
    } else if (!_.has(object1, key) && _.has(object2, key) && !isValueObject(object2, key)) {
      node.type = '+';
      node.value = object2[key];
    }
    acc.push(node);
    return acc;
  }, []);
  return innerTree;
};

export default createInnerTree;
