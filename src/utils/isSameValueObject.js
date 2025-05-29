import _ from 'lodash';

const isSameValueObject = (objA, objB) => {
    // Get common keys that are inside both objA and objB
    const keys = _.intersection(Object.keys(objA), Object.keys(objB));

    // Get common value base on common keys
    const pickCompareA = _.pick(objA, keys);
    const pickCompareB = _.pick(objB, keys);

    return _.isEqual(pickCompareA, pickCompareB);
};

export default isSameValueObject;
