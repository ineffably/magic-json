import { hasArrayPath, starPath } from "./utils";

export type ExtendedType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "arraycell";

export type JSONMagicStrict = MagicValue | MagicValue[];
export type JSONMagic = JSONMagicStrict | any | any[];

export interface MagicValue {
  __stats?: MetaStats;
  key: string;
  value: JSONMagic;
  type: ExtendedType;
  depth?: number;
  path?: string;
}

export interface ColumnStatEntry {
  count: number;
  paths: Record<string, number>;
}

export interface FieldInfo {
  count: number;
  types: Record<ExtendedType, number>;
}

export interface MetaStats {
  columns?: { [key: string]: ColumnStatEntry };
  fields?: { [key: string]: FieldInfo };
  types?: { [key: string]: number };
  strings?: { [key: string]: number };
}

export interface MagicOptions {
  stats?: boolean;
}

// returns array as a type
export function getJSONType(json: any): ExtendedType {
  const type = typeof json;
  if (type === 'object' && Array.isArray(json)) {
    return 'array';
  }
  return type + '' as ExtendedType;
}

export function isEmptyObject(object: any) {
  return Boolean(object) && typeof object === 'object' && Object.keys(object).length === 0;
}

export function getEmptyStats(): MetaStats {
  return ({
    columns: {},
    fields: {},
    types: {},
    strings: {}
  })
}

export const getDefaultOptions = (): MagicOptions => ({
  stats: false
})

export function magicJsonToJson(json: JSONMagic): any {
  return {};
}

export function arrayToMagicJson(json: any[], path = '', depth = 0, stats = getEmptyStats()): JSONMagic {
  if (!json || !Array.isArray(json)) return json;

  const isArrayPath = hasArrayPath(path);
  const keyPath = isArrayPath ? starPath(path + '') : path;

  return json.map((entry, index) => {
    const nextPath = `${path}${index}/`;

    if (typeof entry === 'object') {
      const cols = Object.keys(entry).join(',');

      if (stats) {
        const { columns } = stats;
        if (columns[cols]) {
          columns[cols].count += 1;
          columns[cols].paths[keyPath] = (columns[cols].paths[keyPath] || 0) + 1;
        }
        else {
          columns[cols] = { count: 1, paths: { [keyPath]: 1 } }
        }
      }
    }

    return {
      depth,
      key: index + '',
      path: nextPath,
      value: constructMagicJSON(entry, depth, stats, nextPath),
      type: 'arraycell'
    }
  })
}

export function jsonToMagicJson(json: any, path = '', depth = 0, stats = getEmptyStats()): JSONMagic {
  const keys = Object.keys(json);
  const isArrayPath = hasArrayPath(path);
  const keyPath = isArrayPath ? starPath(path + '') : path;

  return keys.map((key) => {
    const nextPath = `${path}${key}/`;
    const keyedPath = `${keyPath}${key}`;
    const typeName = getJSONType(json[key]);

    stats.fields[keyedPath] = stats.fields[keyedPath] || { count: 0, types: {} } as FieldInfo;
    stats.fields[keyedPath].count += 1;
    stats.fields[keyedPath].types[typeName] = (stats.fields[keyedPath].types[typeName] || 0) + 1;

    return {
      depth,
      key,
      path: nextPath,
      type: typeName,
      value: constructMagicJSON(json[key], depth + 1, stats, nextPath),
    }
  });

}

export function constructMagicJSON(json: any, depth = 0, stats = getEmptyStats(), path = ''): MagicValue | MagicValue[] {
  const type = getJSONType(json);
  const hasStats = true;
  
  if (path === '') {
    const result = {
      depth,
      key: '_root',
      path: '',
      value: constructMagicJSON(json, depth + 1, stats, '/'),
      type
    } as MagicValue
    if (hasStats) {
      result.__stats = stats;
    }
    return result;
  }

  if (!json || (type !== 'object' && type !== 'array') || isEmptyObject(json)) {
    if (typeof json === 'string' && json !== '') {
      stats.strings[json] = (stats.strings[json] || 0) + 1;
    }
    return json;
  }

  if (type === 'array') {
    return arrayToMagicJson(json, path, depth, stats);
  }

  if (type === 'object') {
    return (jsonToMagicJson(json, path, depth, stats));
  }
}

export class MagicJson {
  jsonMagic: JSONMagic;
  json: any;
  stats: any;
  options: MagicOptions;

  constructor(json: any, options = getDefaultOptions()) {
    this.options = options;
    this.doMagic(json);
  }

  static constructMetaJSON = (json: any) => constructMagicJSON(json);

  doMagic(json: any): MagicJson {
    this.json = json;
    this.jsonMagic = constructMagicJSON(json);
    this.stats = (this.jsonMagic as MagicValue).__stats;
    return this;
  }
}
