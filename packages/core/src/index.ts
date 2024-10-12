import { replaceNumericPath } from "./utils";

export type ExtendedType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "arraycell";

export type JSONMeta = MetaValue | MetaValue[];

export interface MetaValue {
  __stats?: MetaStats;
  key: string;
  value: MetaValue | MetaValue[] | any | any[];
  type: ExtendedType;
  depth?: number;
  path?: string;
}

export interface MetaStats {
  cols?: { [key: string]: number };
  fields?: { [key: string]: number };
  types?: { [key: string]: number };
  strings?: { [key: string]: number };
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
    cols: {},
    fields: {},
    types: {},
    strings: {}
  })
}

export const getDefaultOptions = () => ({
  stats: false
});

export function deconstructMetaJSON(json: MetaValue | MetaValue[]): any {
  // console.log('incoming:json:', JSON.stringify(json, null, 2));

  if (typeof json !== 'object') {
    return json;
  }

  const { key, value, type, depth, path } = json as MetaValue;

  if(type === 'arraycell') {
    if(typeof value === 'object') {
      const arrayCellResults = value.reduce((acc, entry) => {
        acc[entry.key] = deconstructMetaJSON(entry);
        return acc;
      }, {})
      return arrayCellResults;
    }
    return value;
  }

  if (type === 'object') {
    return value.reduce((acc, entry) => {
      if (entry.type === 'array') {
        acc[entry.key] = entry.value.map((innerEntry) => {
          return deconstructMetaJSON(innerEntry);
        })
      }
      else if (entry.type === 'object') {
        acc[entry.key] = entry.value.reduce((acc, innerEntry) => {
          acc[innerEntry.key] = deconstructMetaJSON(innerEntry);
          return acc;
        }, {} as any);
      }
      else {
        acc[entry.key] = entry.value;
      }
      return acc;
    }, {})
  }
  else {
    return value;
  }
}

export function constructMetaJSON(json: any, options = getDefaultOptions(), depth = 0, stats = getEmptyStats(), path = ''): MetaValue | MetaValue[] | any | any[] {
  const type = getJSONType(json);

  if (path === '') {
    const result = {
      depth,
      key: '_root',
      path: '',
      value: constructMetaJSON(json, options, depth + 1, stats, '/'),
      type
    } as MetaValue
    if(options.stats) {
      result.__stats = stats;
    }
    return result;
  }

  if (!json || (type !== 'object' && type !== 'array') || isEmptyObject(json)) {
    if(typeof json === 'string' && json !== '') {
      stats.strings[json] = (stats.strings[json] || 0) + 1;
    }
    return json;
  }

  if (type === 'array') {
    return json.map((entry, index) => {
      if(typeof entry === 'object') {
        const cols = Object.keys(entry).join(',') + `,${replaceNumericPath(path, `[0-${json.length - 1}`)}]`;
        stats.cols[cols] = (stats.cols[cols] || 0) + 1;
      }
      const nextPath = `${path}${index}/`;
      return {
        depth,
        key: index + '',
        path: nextPath,
        value: constructMetaJSON(entry, options, depth, stats, nextPath),
        type: 'arraycell'
      }
    })
  }

  if (type === 'object') {
    const keys = Object.keys(json);
    return keys.map((key) => {
      stats.fields[key] = (stats.fields[key] || 0) + 1;
      const nextPath = `${path}${key}/`;
      return {
        depth,
        key,
        path: nextPath,
        type: getJSONType(json[key]),
        value: constructMetaJSON(json[key], options, depth + 1, stats, nextPath),
      }
    });
  }
}

export class MagicJson {
  jsonMeta: JSONMeta;
  json: any;
  stats: any;

  constructor(json: any) {
    this.doMagic(json);
  }

  static constructJSONMeta = (json: any) => constructMetaJSON(json);

  doMagic(json: any) {
    this.json = json;
    this.jsonMeta = constructMetaJSON(json);
    this.stats = (this.jsonMeta as MetaValue).__stats;
  }
}