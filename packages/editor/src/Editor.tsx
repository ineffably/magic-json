import { useContext, useEffect } from "react"
import { MagicRender } from "./magic-render";
import { Editor } from "@monaco-editor/react";
import { Splitter, Tabs } from "antd";
import { AppContext } from "./state-provider";
import json from './test-data/set1-en_us.json';

export const MagicJsonEditor = () => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      // this is where you would dispatch an updated loaded state
      if (dispatch) {
        dispatch({ type: 'Loaded', payload: { isLoaded: true } });
      }
    })()
  }, [])

  const subjectJson = json.slice(0, 20);

  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
      <Splitter>
        <Splitter.Panel>
          <Tabs style={{ padding: '5px' }}
            items={[
              {
                key: 'all',
                label: 'Render Raw',
                children: (
                  <div style={{ height: '95vh', overflowY: 'auto' }} >
                    <MagicRender json={subjectJson} options={{ renderType: 'raw' }} />
                  </div>
                )
              },
              {
                key: 'values',
                label: 'Render Values',
                children: (
                  <div>
                    <MagicRender json={subjectJson} options={{ renderType: 'values' }} />
                  </div>
                )
              },
              {
                key: 'stats',
                label: 'Render Stats',
                children: (
                  <div>
                    <MagicRender json={subjectJson} options={{ renderType: 'stats' }} />
                  </div>
                )
              },
              {
                key: 'magic-ui',
                label: 'Magic UI',
                children: (
                  <div>
                    <MagicRender json={subjectJson} options={{ renderType: 'edit' }} />
                  </div>
                )
              }

            ]}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <div>
            <Tabs style={{ padding: '5px' }}
              items={[
                {
                  key: 'all',
                  label: 'Paste JSON here',
                  children: (
                    <Editor
                      height="90vh"
                      defaultLanguage="json"
                      value={JSON.stringify(subjectJson, null, 2)}
                    />
                  )
                }
              ]}
            />
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  )
}

export default MagicJsonEditor;
export { MagicJsonEditor as Editor };