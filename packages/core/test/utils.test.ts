import { constructMetaJSON } from "../src";
import { hasShape, isEmptyObject } from "../src/utils";

describe('core tests', () => {

  describe('isEmptyObject tests', () => {
    it('passes the basic checks', () => {
      expect(isEmptyObject(null)).toBe(false);
      expect(isEmptyObject(undefined)).toBe(false);
      expect(isEmptyObject([])).toBe(true);
      expect(isEmptyObject({})).toBe(true);
      expect(isEmptyObject({a:null})).toBe(false);
      expect(isEmptyObject(['hi'])).toBe(false);
      expect(isEmptyObject('hi')).toBe(false);
      expect(isEmptyObject(1)).toBe(false);
      expect(isEmptyObject(0)).toBe(false);
    })
  })

  describe('has Shape', () => {

    it('passes with mixed object fields', () => {
      expect(hasShape(
        { path: '/', key: '_root', type: 'object', value: null, depth: 0 },
        { depth: 0, key: '_root', path: '/', type: 'object', value: null }
      )).toBe(true)
    })

    it('passes with simple objects', () => {

      expect(hasShape({}, {})).toBe(true);
      expect(hasShape({ a: 1 }, { a: 1 })).toBe(true);
      expect(hasShape({ a: 1, color: 'blue' }, { a: 1, color: 'blue' })).toBe(true);
      expect(hasShape({ a: 1, ['color']: 'blue' }, { a: 1, color: 'blue' })).toBe(true);
      expect(hasShape([{ a: 1, ['color']: 'blue' }], [{ a: 1, color: 'blue' }])).toBe(true);

      expect(hasShape({ options: { pass: true } }, { options: { pass: true } })).toBe(true);
      expect(hasShape({ options: { pass: true } }, { options: { pass: false } })).toBe(false);

      expect(hasShape({}, null)).toBe(false)
      expect(hasShape({ a: 1 }, {})).toBe(false);
      expect(hasShape({ a: 1, color: 'blue' }, { a: 1, color: 'red' })).toBe(false);
      expect(hasShape([{ a: 1 }], [{ b: 2 }])).toBe(false);

      try { expect(hasShape(null, null)).toThrow('hasShape expects an object type') } catch (e) { }
      try { expect(hasShape('fish', 'fry')).toThrow('hasShape expects an object type') } catch (e) { }
    })


  })

  describe('constructMetaJSON: basic transforms', () => {

    it('it should gracefully fail with null', () => {
      const desiredValue = {
        depth: 0,
        key: '_root',
        path: '',
        type: 'object',
        value: null
      };
      const testJsonResult = constructMetaJSON(null);
      expect(hasShape(testJsonResult, desiredValue)).toBe(true);
    })

    it('it should return an empty object using an empty object', () => {
      const desiredShape = {
        depth: 0,
        key: '_root',
        path: '/',
        type: 'object',
        value: {}
      };
      const testJson = {};
      // hasShape(testJson, desiredShape)
      const testJsonResult = constructMetaJSON(testJson);

    })


  })

});

