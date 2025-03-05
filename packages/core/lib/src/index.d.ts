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
    columns?: {
        [key: string]: ColumnStatEntry;
    };
    fields?: {
        [key: string]: FieldInfo;
    };
    types?: {
        [key: string]: number;
    };
    strings?: {
        [key: string]: number;
    };
}
export interface MagicOptions {
    stats?: boolean;
}
export declare function getJSONType(json: any): ExtendedType;
export declare function isEmptyObject(object: any): boolean;
export declare function getEmptyStats(): MetaStats;
export declare const getDefaultOptions: () => MagicOptions;
export declare function magicJsonToJson(json: JSONMagic): any;
export declare function arrayToMagicJson(json: any[], path?: string, depth?: number, stats?: MetaStats): JSONMagic;
export declare function jsonToMagicJson(json: any, path?: string, depth?: number, stats?: MetaStats): JSONMagic;
export declare function constructMagicJSON(json: any, depth?: number, stats?: MetaStats, path?: string): MagicValue | MagicValue[];
export declare class MagicJson {
    jsonMagic: JSONMagic;
    json: any;
    stats: any;
    options: MagicOptions;
    constructor(json: any, options?: MagicOptions);
    static constructMetaJSON: (json: any) => MagicValue | MagicValue[];
    doMagic(json: any): MagicJson;
}
