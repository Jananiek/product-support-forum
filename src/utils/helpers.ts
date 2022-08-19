export const removeNullOrUndefinedValues = (options: Record<string, any>): any => {
  Object.keys(options).forEach(key => {
    if (options[key] === null || options[key] === undefined) {
      delete options[key];
    }
  });
  return options;
};
