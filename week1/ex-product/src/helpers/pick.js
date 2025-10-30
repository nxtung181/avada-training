export function pick(object, paths) {
  if (object == null) return {};

  const result = {};

  for (const path of paths) {
    const value = getValue(object, path);
    if (value !== undefined) {
      setValue(result, path, value);
    }
  }

  return result;
}

function getValue(obj, path) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[key];
  }

  return current;
}

function setValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
  }
}