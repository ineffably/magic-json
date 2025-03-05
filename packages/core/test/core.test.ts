import { constructMagicJSON, magicJsonToJson } from "../src";
import { hasShape, isEmptyObject } from "../src/utils";

describe('core tests', () => {

  describe('constructMetaJSON: basic transforms', () => {

    it('it should gracefully fail with null', () => {
      const desiredValue = {
        depth: 0,
        key: '_root',
        path: '',
        type: 'object',
        value: null,
        __stats: { columns: {}, fields: {}, types: {}, strings: {} }
      };
      const testJsonResult = constructMagicJSON(null);

      expect(hasShape(testJsonResult, desiredValue)).toBe(true);
    })

    it('it should return an empty object using an empty object', () => {
      const desiredShape = {
        depth: 0,
        key: '_root',
        path: '',
        type: 'object',
        value: {},
        __stats: { columns: {}, fields: {}, types: {}, strings: {} }
      };
      const testJson = {};
      const testJsonResult = constructMagicJSON(testJson);
      expect(hasShape(testJsonResult, desiredShape)).toBe(true);
    })


    it.skip('test3', () => {
      const testJson = {
        color: 'blue',
        size: 'large',
        count: 2
      };
      
      const testJsonResult = constructMagicJSON(testJson);
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
      const testJsonResult = constructMagicJSON(testJson);
      // console.log(JSON.stringify(testJsonResult, null, 2));
      const json = magicJsonToJson(testJsonResult);
      
    })


    describe('deconstructMetaJSON: basic transforms', () => {
      it.skip('deconstructs basic dictionary', () => {
        const testJson = {
          color: 'blue',
          size: 'large',
          count: 2
        };
        const testJsonResult = constructMagicJSON(testJson);
        const desconstrcuted = magicJsonToJson(testJsonResult);
        expect(hasShape(testJson, desconstrcuted)).toBe(true);
      })

      it.skip('deconstructs object depth of 2', () => {
        const testJson = {
          color: 'blue',
          size: 'large',
          count: 2,
          options: {
            pass: true,
            fail: false
          }
        };
        const testJsonResult = constructMagicJSON(testJson);
        const desconstrcuted = magicJsonToJson(testJsonResult);
        expect(hasShape(testJson, desconstrcuted)).toBe(true);
      })

      it.skip('deconstructs arrays of objects', () => {
        const testJson = {
          options: [
            { pass: true },
            { fail: false }
          ]
        };
        const testJsonResult = constructMagicJSON(testJson);
        const deconstructed = magicJsonToJson(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.info('errors:', errors);
        }
        expect(isShape).toBe(true);
      })

      it.skip('deconstructs arrays of primitives', () => {
        const testJson = {
          options: [true,false],
          colors: ['red', 'green', 'blue']
        };
        const testJsonResult = constructMagicJSON(testJson);
        const deconstructed = magicJsonToJson(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.info('errors:', errors);
        }
        expect(isShape).toBe(true);
      })

      it.skip('deconstructs arrays of arrays', () => {
        const testJson = {
          options: [
            [true, false], [true, false]
          ],
          colors: [
            ['red', 'green', 'blue']
          ]
        };

        const testJsonResult = constructMagicJSON(testJson);
        const deconstructed = magicJsonToJson(testJsonResult);
        const errors = [];
        const isShape = hasShape(testJson, deconstructed, '/', errors);
        if (!isShape) {
          console.info('errors:', errors);
        }
        expect(isShape).toBe(true);
      })
    })
  })
});

