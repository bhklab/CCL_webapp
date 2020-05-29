// removes '.' from the object key names
const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = key.includes(".") ? key.replace(".", "") : key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

const standardizeROutput = (arr) => {
  return arr.map(obj => renameKeys(obj))
}

export default standardizeROutput;