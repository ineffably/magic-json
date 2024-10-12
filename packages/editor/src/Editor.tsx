import { constructMetaJSON } from "@magic-json/core";
import { useContext, useEffect } from "react"
import { MagicRender } from "./magic-render";
import { Editor } from "@monaco-editor/react";
import { Tabs } from "antd";
import json from './test-data/set1-en_us.json';
import { AppContext } from "./state-provider";

export const MagicJsonEditor = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      const jsonDeconstructed = constructMetaJSON(json);

      // console.log('jsonDeconstructed size:', JSON.stringify(jsonDeconstructed).length);
      // console.log('json origin size:', JSON.stringify(json).length);

      // console.log('App:jsonDeconstructed:', jsonDeconstructed);
      // this is where you would dispatch an updated loaded state
      dispatch({ type: 'Loaded', payload: { isLoaded: true } });
    }
    init();
  }, [])

  const subjectJson = json;

  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <Tabs
        style={{ padding: '5px' }}
        items={[{
          key: 'all',
          label: 'Render Raw',
          children: <div style={{ height: '95vh', overflowY: 'auto', maxWidth: '50vw' }} >
            <MagicRender json={subjectJson} options={{ renderType: 'raw' }} />
          </div>
        },
        // {
        //   key: 'edit',
        //   label: 'Render Edit Mode',
        //   children: <MagicJson json={subjectJson} options={{ renderType: 'edit' }} />
        // },
        {
          key: 'values',
          label: 'Render Values',
          children: <div style={{ maxWidth: '50vw' }}><MagicRender json={subjectJson} options={{ renderType: 'values' }} /></div>
        }

        ]} />
      <div style={{ marginTop: '65px' }}>
        <Editor
          height="90vh"
          width="50vw"
          defaultLanguage="json"
          value={JSON.stringify(subjectJson, null, 2)}
        />
      </div>
    </div>
  )
}

export default MagicJsonEditor;
export { MagicJsonEditor as Editor };