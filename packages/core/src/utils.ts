
export const isEmptyObject = (object) => (
  Boolean(object) && typeof object === 'object' && Object.keys(object).length === 0
)

export function hasShape(subject = {}, shape = {}, path = '/', errors = []) {
  if (!Boolean(subject) || typeof subject !== 'object') {
    throw new Error('hasShape expects an object type')
  }

  const entrys = Object.entries(subject);
  if (entrys.length === 0) return isEmptyObject(shape);

  const result = entrys.map(([key, value]) => {
    if (typeof (value || false) === 'object') {
      const bothIsObject = typeof (shape[key] || false) === 'object';
      errors.push(`mismatch on object types for field "${path}${key}"`)
      if (!bothIsObject) return false;
      return hasShape(shape[key], value, `${path}${key}/`, errors)
    }
    const equivResult = shape[key] === value;
    if (!equivResult) {
      errors.push(`mismatch on field "${key}" at ${path} [${[shape[key], value].join(':')}]`)
    }
    return equivResult;
  })
  return result.every(v => v);
}