export interface AgentArgs {
    entry: any;
    field: string | number;
    value: any;
    depth: number;
    path: string;
}
export type TraverseAgent = (a: AgentArgs) => any;
export declare const traverse: (json: any, agents?: TraverseAgent[], depth?: number, path?: string) => any;
