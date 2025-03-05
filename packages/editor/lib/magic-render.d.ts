import type { MagicRenderProps } from './types/editor-types';
export declare const MagicRenderValues: ({ jsonDeconstructed }: MagicRenderProps) => import("react/jsx-runtime").JSX.Element | import("react/jsx-runtime").JSX.Element[];
export declare const MagicRenderRaw: ({ jsonDeconstructed }: MagicRenderProps) => import("react/jsx-runtime").JSX.Element;
export declare const MagicRenderJsonFromMagic: ({ jsonDeconstructed }: MagicRenderProps) => import("react/jsx-runtime").JSX.Element;
export declare const MagicRenderStats: ({ jsonDeconstructed }: {
    jsonDeconstructed: any;
}) => import("react/jsx-runtime").JSX.Element;
interface MagicJsonOptions {
    renderType?: 'values' | 'raw' | 'edit' | 'stats' | 'revert';
    renderStats?: boolean;
}
interface MagicJsonProps {
    json: any;
    options?: MagicJsonOptions;
}
export declare const MagicRender: ({ json, options }: MagicJsonProps) => import("react/jsx-runtime").JSX.Element;
export {};
