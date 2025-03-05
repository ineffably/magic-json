import { Tabs } from "antd";
import { MagicRenderProps } from "./types/editor-types";


export const MagicRenderSettingsEditor = ({ jsonDeconstructed }: MagicRenderProps) => {
  const { __stats } = jsonDeconstructed;
  const { columns, fields, types, strings } = __stats;

  return (
    <div style={{ padding: '5px' }}>
      <Tabs
        size="small"
        items={[
          {
            key: 'ui',
            label: 'UI',
            children: (
              <div>
                User Interface
              </div>
            )
          },
          {
            key: 'json',
            label: 'JSON',
            children: (
              <div style={{ height: '95vh', overflowY: 'auto', maxWidth: '50vw' }} >
                <pre>{JSON.stringify(jsonDeconstructed, null, 2)}</pre>
              </div>
            )
          }
        ]}
      />
    </div>
  )
}