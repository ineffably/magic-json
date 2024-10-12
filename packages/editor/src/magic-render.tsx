import { constructMetaJSON, MetaValue } from '@magic-json/core';
import { Editor } from '@monaco-editor/react';

interface MagicRnderProps {
  jsonDeconstructed: MetaValue;
}

export const MagicRenderValues = ({ jsonDeconstructed }: MagicRnderProps) => {
  const { key, type, value, depth } = jsonDeconstructed;

  if (Array.isArray(jsonDeconstructed)) {
    return jsonDeconstructed.map(entry => <MagicRenderValues jsonDeconstructed={entry} />);
  }

  const typofValue = typeof value;

  return (
    <div>
      <div><i>({type})</i> <b>{key}</b> {typofValue !== 'object' && value}</div>
      {typofValue == 'object' &&
        <div style={{ padding: '0 5px', margin: '0 5px' }}>
          {Array.isArray(value) && value.map((item, index) => <MagicRenderValues jsonDeconstructed={item} />)}
          {!Array.isArray(value) && typofValue === 'object' && Object.keys(value).map(field => <MagicRenderValues jsonDeconstructed={value[field]} />)}
        </div>
      }
    </div>
  );
}

export const MagicRenderRaw = ({ jsonDeconstructed }: MagicRnderProps) => {

  return (
    <Editor
      height='95vh'
      width='50vw'
      defaultLanguage='json'
      value={JSON.stringify(jsonDeconstructed, null, 2)}
    />
  )
}

export const MagicRenderEdit = ({ jsonDeconstructed }: MagicRnderProps) => {

  function Render({ target }) {
    if (target === null || target === undefined) return null;

    if (typeof target === 'object') {
      if (target.type === 'array' && Array.isArray(target.value)) return target.value.map(item => <Render target={item} />);
      if (target.type && target.key && typeof target.value === 'object') {
        return (
          <div style={{ marginLeft: '10px' }}>
            <div>
              <div><i>{target.type}</i></div>
            </div>
            {target.value && Object.keys(target.value).map(field => {
              return (
                <div>
                  <b>{field}</b>: <Render target={target.value[field]} />
                </div>
              )
            })}
          </div>
        )
      }

      return (<div><pre>{JSON.stringify(target, null, 2)}</pre></div>)
    }

    return (
      <div>{typeof target}</div>
    )
  }

  return (
    <div style={{ padding: '5px' }}>
      <Render target={jsonDeconstructed} />
    </div>
  )
}

export const MagicRenderStats = ({ jsonDeconstructed }) => {
  return (
    <div>
      <div>Stats</div>
    </div>
  )
}

interface MagicJsonOptions {
  renderType?: 'values' | 'raw' | 'edit' | 'stats';
  renderStats?: boolean;
}

interface MagicJsonProps {
  json: any;
  options?: MagicJsonOptions;
}

export const MagicRender = ({ json, options = {} }: MagicJsonProps) => {
  const deconstructed = constructMetaJSON(json);
  const { renderType = 'edit', renderStats = true } = options;

  if (renderType === 'values') {
    return <MagicRenderValues jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'stats') {
    return <MagicRenderStats jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'raw') {
    return <MagicRenderRaw jsonDeconstructed={deconstructed} />
  }
  if (renderType === 'edit') {
    return <MagicRenderEdit jsonDeconstructed={deconstructed} />
  }

  return (
    <div>
    </div>
  )
}