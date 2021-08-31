export type Dictionary<T> = { [key: string]: T };

export function dictionaryCopy<T>(dic: Dictionary<T>): Dictionary<T> {
  const dicTemp: Dictionary<T> = {};
  Object.keys(dic).forEach(key => (dicTemp[key] = dic[key]));
  return dicTemp;
}

export function dictionaryEquals<T>(a: Dictionary<T>, b: Dictionary<T>): boolean {
  return !Object.keys(a).some(key => a[key] !== b[key]);
}

export default Dictionary;
