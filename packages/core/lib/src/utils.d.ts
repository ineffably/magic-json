export declare const isEmptyObject: (object: any) => boolean;
export declare const getArrayPathRegex: () => RegExp;
export declare const hasArrayPath: (path: string) => boolean;
export declare const starPath: (path: string, replaceWith?: string) => string;
export declare function hasShape(subject?: {}, shape?: {}, path?: string, errors?: any[]): boolean;
export declare const sortByField: (fieldName?: string, order?: ("asc" | "dec")) => (a: any, b: any) => 0 | 1 | -1;
export declare const indexByField: <T>(array: T[], field: any) => {};
