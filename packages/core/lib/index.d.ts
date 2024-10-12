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
    cols?: {
        [key: string]: number;
    };
    fields?: {
        [key: string]: number;
    };
    types?: {
        [key: string]: number;
    };
    strings?: {
        [key: string]: number;
    };
}
export declare function getJSONType(json: any): ExtendedType;
export declare function isEmptyObject(object: any): boolean;
export declare function getEmptyStats(): MetaStats;
export declare const getDefaultOptions: () => {
    stats: boolean;
};
export declare function deconstructMetaJSON(json: MetaValue | MetaValue[]): any;
export declare function constructMetaJSON(json: any, options?: {
    stats: boolean;
}, depth?: number, stats?: MetaStats, path?: string): MetaValue | MetaValue[] | any | any[];
export declare class MagicJson {
    jsonMeta: JSONMeta;
    json: any;
    stats: any;
    constructor(json: any);
    static constructJSONMeta: (json: any) => any;
    doMagic(json: any): void;
}
