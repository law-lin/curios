import _ from 'lodash';

const toCamelCase: any = (data: any) => {
  if (!_.isObject(data)) {
    return data;
  } else if (_.isArray(data)) {
    return data.map((v) => toCamelCase(v));
  }
  return _.reduce(
    data,
    (r, v, k) => {
      return {
        ...r,
        [_.camelCase(k)]: toCamelCase(v),
      };
    },
    {}
  );
};

export default toCamelCase;
