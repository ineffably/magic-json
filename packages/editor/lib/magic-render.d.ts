import { MetaValue } from '@magic-json/core';
interface MagicRnderProps {
    jsonDeconstructed: MetaValue;
}
export declare const MagicRenderValues: ({ jsonDeconstructed }: MagicRnderProps) => import("react/jsx-runtime").JSX.Element | import("react/jsx-runtime").JSX.Element[];
export declare const MagicRenderRaw: ({ jsonDeconstructed }: MagicRnderProps) => import("react/jsx-runtime").JSX.Element;
export declare const MagicRenderEdit: ({ jsonDeconstructed }: MagicRnderProps) => import("react/jsx-runtime").JSX.Element;
export declare const MagicRenderStats: ({ jsonDeconstructed }: {
    jsonDeconstructed: any;
}) => import("react/jsx-runtime").JSX.Element;
interface MagicJsonOptions {
    renderType?: 'values' | 'raw' | 'edit' | 'stats';
    renderStats?: boolean;
}
interface MagicJsonProps {
    json: any;
    options?: MagicJsonOptions;
}
export declare const MagicRender: ({ json, options }: MagicJsonProps) => import("react/jsx-runtime").JSX.Element;
export {};
