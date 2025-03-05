import { traverse } from '../src/traverse';

describe('traverse', () => {
  
  it('test1', () => { 
    const result = traverse({a: 1, b: 2});
    expect(result).toEqual({a: 1, b: 2});
  })

  it('test2', () => { 
    const agent = ({entry, field, value, depth, path}) => {
      return value;
    };
    const result = traverse({a: 1, b: 2}, [agent]);
    expect(result).toEqual({a: 1, b: 2});
  })

})