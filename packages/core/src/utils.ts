export const isEmptyObject = (object): boolean => (
  object !== null && 
  typeof object === 'object' && 
  (Array.isArray(object) ? 
    object.length === 0 : 
    Object.keys(object).length === 0)
)

export const getArrayPathRegex = () => new RegExp(/\/(\d+)\//gi);

export const hasArrayPath = (path: string) => (getArrayPathRegex().test(path));

export const starPath = (path: string, replaceWith: string = '/*/') => path.replace(getArrayPathRegex(), replaceWith);

export function hasShape(subject = {}, shape = {}, path = '/', errors = []): boolean {
  if (!Boolean(subject) || typeof subject !== 'object') {
    throw new Error('hasShape expects an object type')
  }

  const entrys = Object.entries(subject);
  if (entrys.length === 0) return isEmptyObject(shape);

  return entrys.map(([key, value]) => {
    
    if (typeof (value || false) === 'object') {
      const bothIsObject = typeof (shape[key] || false) === 'object';
      errors.push(`mismatch on object types for field "${path}${key}"`)
      if (!bothIsObject) return false;
      return hasShape(value, shape[key], `${path}${key}/`, errors)
    }

    const equivResult = shape[key] === value;
    if (!equivResult) {
      errors.push(`mismatch on field "${key}" at ${path} [${[shape[key], value].join(':')}]`)
    }

    return equivResult;
  }).every(v => v);
}

export const sortByField = (fieldName = '', order = 'asc' as ('asc'|'dec')) => (a, b) => {
  if (a[fieldName] < b[fieldName]) return (order === 'asc' ? -1 : 1);
  if (a[fieldName] > b[fieldName]) return (order === 'asc' ? 1 : -1);
  return 0;
}

export const indexByField = <T>(array = [] as T[], field) => {
  return array.reduce((acc, item) => {
    acc[item[field]] = item;
    return acc;
  }, {});  
}
