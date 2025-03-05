import type { MagicValue } from '@magic-json/core';
import type { Dispatch } from 'react';

export interface AppState {
  isLoaded?: boolean;
}

// add more action types here for new application state opperations
export type ActionTypes =
  'Loaded';

export interface ReducerActions<T = any> {
  payload: T;
  type: ActionTypes;
}

export interface ProviderState<T = any> {
  state: AppState;
  dispatch?: Dispatch<ReducerActions<T>>;
}

export type IndexedCategory = {
  key: string;
  label: string;
  children: any[];
}

export type IndexedCounts = {
  categories: { [key: string]: number };
  total: number;
}

export type IndexedEntries = {
  categories: IndexedCategory[];
  itemCounts: IndexedCounts;
}

export interface MagicRenderProps {
  jsonDeconstructed: MagicValue; // _root value is never an array
}