
export interface AgentArgs {
  entry: any;
  field: string | number;
  value: any;
  depth: number;
  path: string;
}
export type TraverseAgent = (a: AgentArgs) => any;


export const traverse = (json: any, agents = [] as TraverseAgent[], depth = 0, path = '/') => {
  if (!json || typeof json !== 'object') return json;

  if (Array.isArray(json)) {
    return json.map((entry: any, index: number) => {
      const nextPath = `${path}${index}/`;
      const itemEntry = agents.reduce((value, agent) => agent({ entry, field: index, value, depth, path: nextPath }), entry);
      return (
        traverse(itemEntry, agents, depth + 1, nextPath)
      )
    })
  };


  const fields = Object.keys(json);
  const result = {} as any;
  fields.reduce((acc, field) => {
    const nextPath = `${path}${field}/`;
    const entry = traverse(json[field], agents, depth + 1, nextPath);
    const agentsValue = agents.reduce((value, agent) => agent({ entry, field, value, depth, path: nextPath }), entry);
    acc[field] = agentsValue;
    return acc
  }, result)

  return result;
}