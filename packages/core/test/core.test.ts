import path from "path";
import { constructMetaJSON, deconstructMetaJSON } from "../src";
import { hasShape, isEmptyObject } from "../src/utils";

describe('core tests', () => {

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
        path: '',
        type: 'object',
        value: {}
      };
      const testJson = {};
      const testJsonResult = constructMetaJSON(testJson);
      expect(hasShape(testJsonResult, desiredShape)).toBe(true);
    })


    it.skip('test3', () => {
      const testJson = {
        color: 'blue',
        size: 'large',
        count: 2
      };
      
      const testJsonResult = constructMetaJSON(testJson);
      

    })

    it.skip('test4', () => {
      const testJson = {
        color: 'blue',
        size: 'large',
        count: 2,
        options: {
          pass: true,
          fail: false
        },
        items: [
          { name: 'item1', value: 1 },
          { name: 'item2', value: 2 }
        ]
      };
      const testJsonResult = constructMetaJSON(testJson);
      // console.log(JSON.stringify(testJsonResult, null, 2));
      const desconstrcuted = deconstructMetaJSON(testJsonResult);
      
    })


    describe('deconstructMetaJSON: basic transforms', () => {
      it('deconstructs basic dictionary', () => {
        const testJson = {
          color: 'blue',
          size: 'large',
          count: 2
        };
        const testJsonResult = constructMetaJSON(testJson);
        const desconstrcuted = deconstructMetaJSON(testJsonResult);
        expect(hasShape(testJson, desconstrcuted)).toBe(true);
      })

      it('deconstructs object depth of 2', () => {
        const testJson = {
          color: 'blue',
          size: 'large',
          count: 2,
          options: {
            pass: true,
            fail: false
          }
        };
        const testJsonResult = constructMetaJSON(testJson);
        const desconstrcuted = deconstructMetaJSON(testJsonResult);
        expect(hasShape(testJson, desconstrcuted)).toBe(true);
      })

      it('deconstructs arrays of objects', () => {
        const testJson = {
          options: [
            { pass: true },
            { fail: false }
          ]
        };
        const testJsonResult = constructMetaJSON(testJson);
        const deconstructed = deconstructMetaJSON(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.log('errors:', errors);
        }
        expect(isShape).toBe(true);
      })

      it('deconstructs arrays of primitives', () => {
        const testJson = {
          options: [true,false],
          colors: ['red', 'green', 'blue']
        };
        const testJsonResult = constructMetaJSON(testJson);
        const deconstructed = deconstructMetaJSON(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.log('errors:', errors);
        }
        expect(isShape).toBe(true);
      })

      it('deconstructs arrays of arrays', () => {
        const testJson = {
          options: [
            [true, false], [true, false]
          ],
          colors: [
            ['red', 'green', 'blue']
          ]
        };
        const testJsonResult = constructMetaJSON(testJson);
        const deconstructed = deconstructMetaJSON(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.log('errors:', errors);
        }
        expect(isShape).toBe(true);
      })
    })
  })
});

