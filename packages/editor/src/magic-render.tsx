import { MagicJson, magicJsonToJson } from '@magic-json/core';
import { Editor } from '@monaco-editor/react';
import type { MagicRenderProps } from './types/editor-types';
import { MagicRenderSettingsEditor } from './magic-render-settings-editor';
import { Tabs } from 'antd';


export const MagicRenderValues = ({ jsonDeconstructed }: MagicRenderProps) => {
  if (Array.isArray(jsonDeconstructed)) {
    return jsonDeconstructed.map(entry => <MagicRenderValues jsonDeconstructed={entry} />);
  }
  const { key, type, value, depth } = jsonDeconstructed;
  const typofValue = typeof value;

  return (
    <div>
      <div><i>({type})</i> <b>{key}</b> {typofValue !== 'object' && value}</div>
      {typofValue == 'object' &&
        <div style={{ padding: '0 5px', margin: '0 5px' }} key={key}>
          {Array.isArray(value) && value.map((item, index) => <MagicRenderValues key={(key + index)} jsonDeconstructed={item} />)}
          {!Array.isArray(value) && typofValue === 'object' && Object.keys(value).map(field => <MagicRenderValues key={key + field} jsonDeconstructed={value[field]} />)}
        </div>
      }
    </div>
  );
}

export const MagicRenderRaw = ({ jsonDeconstructed }: MagicRenderProps) => {

  return (
    <Editor
      height='95vh'
      defaultLanguage='json'
      value={JSON.stringify(jsonDeconstructed, null, 2)}
    />
  )
}

export const MagicRenderJsonFromMagic = ({ jsonDeconstructed }: MagicRenderProps) => {
  const json = magicJsonToJson(jsonDeconstructed);
  return (
    <Editor
      height='95vh'
      defaultLanguage='json'
      value={JSON.stringify(json, null, 2)}
    />
  )
}

export const MagicRenderStats = ({ jsonDeconstructed }) => {
  const { __stats = {} } = jsonDeconstructed;
  return (
    <Tabs defaultActiveKey="1" items={[
      {
        label: 'Html',
        key: 'html',
        children: (<div>html goes here</div>)
      },
      {
        label: 'JSON',
        key: 'json',
        children: <Editor
          height='95vh'
          defaultLanguage='json'
          value={JSON.stringify(__stats, null, 2)}
        />
      }
    ]} />
  )
}

interface MagicJsonOptions {
  renderType?: 'values' | 'raw' | 'edit' | 'stats' | 'revert';
  renderStats?: boolean;
}

interface MagicJsonProps {
  json: any;
  options?: MagicJsonOptions;
}

export const MagicRender = ({ json, options = {} }: MagicJsonProps) => {
  const magicJson = new MagicJson(json, { stats: true });
  const deconstructed = magicJson.jsonMagic
  const { renderType = 'edit' } = options;

  if (renderType === 'values') {
    return <MagicRenderValues jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'stats') {
    return <MagicRenderStats jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'revert') {
    return <MagicRenderJsonFromMagic jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'raw') {
    return <MagicRenderRaw jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'edit') {
    return <MagicRenderSettingsEditor jsonDeconstructed={deconstructed} />
  }

  return (
    <div>
      <h1>Invalid render type</h1>
    </div>
  )
}