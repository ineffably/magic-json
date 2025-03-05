(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["core"] = factory();
	else
		root["core"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MagicJson = exports.getDefaultOptions = void 0;
exports.getJSONType = getJSONType;
exports.isEmptyObject = isEmptyObject;
exports.getEmptyStats = getEmptyStats;
exports.magicJsonToJson = magicJsonToJson;
exports.arrayToMagicJson = arrayToMagicJson;
exports.jsonToMagicJson = jsonToMagicJson;
exports.constructMagicJSON = constructMagicJSON;
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function getJSONType(json) {
    const type = typeof json;
    if (type === 'object' && Array.isArray(json)) {
        return 'array';
    }
    return type + '';
}
function isEmptyObject(object) {
    return Boolean(object) && typeof object === 'object' && Object.keys(object).length === 0;
}
function getEmptyStats() {
    return ({
        columns: {},
        fields: {},
        types: {},
        strings: {}
    });
}
const getDefaultOptions = () => ({
    stats: false
});
exports.getDefaultOptions = getDefaultOptions;
function magicJsonToJson(json) {
    return {};
}
function arrayToMagicJson(json, path = '', depth = 0, stats = getEmptyStats()) {
    if (!json || !Array.isArray(json))
        return json;
    const isArrayPath = (0, utils_1.hasArrayPath)(path);
    const keyPath = isArrayPath ? (0, utils_1.starPath)(path + '') : path;
    return json.map((entry, index) => {
        const nextPath = `${path}${index}/`;
        if (typeof entry === 'object') {
            const cols = Object.keys(entry).join(',');
            if (stats) {
                const { columns } = stats;
                if (columns[cols]) {
                    columns[cols].count += 1;
                    columns[cols].paths[keyPath] = (columns[cols].paths[keyPath] || 0) + 1;
                }
                else {
                    columns[cols] = { count: 1, paths: { [keyPath]: 1 } };
                }
            }
        }
        return {
            depth,
            key: index + '',
            path: nextPath,
            value: constructMagicJSON(entry, depth, stats, nextPath),
            type: 'arraycell'
        };
    });
}
function jsonToMagicJson(json, path = '', depth = 0, stats = getEmptyStats()) {
    const keys = Object.keys(json);
    const isArrayPath = (0, utils_1.hasArrayPath)(path);
    const keyPath = isArrayPath ? (0, utils_1.starPath)(path + '') : path;
    return keys.map((key) => {
        const nextPath = `${path}${key}/`;
        const keyedPath = `${keyPath}${key}`;
        const typeName = getJSONType(json[key]);
        stats.fields[keyedPath] = stats.fields[keyedPath] || { count: 0, types: {} };
        stats.fields[keyedPath].count += 1;
        stats.fields[keyedPath].types[typeName] = (stats.fields[keyedPath].types[typeName] || 0) + 1;
        return {
            depth,
            key,
            path: nextPath,
            type: typeName,
            value: constructMagicJSON(json[key], depth + 1, stats, nextPath),
        };
    });
}
function constructMagicJSON(json, depth = 0, stats = getEmptyStats(), path = '') {
    const type = getJSONType(json);
    const hasStats = true;
    if (path === '') {
        const result = {
            depth,
            key: '_root',
            path: '',
            value: constructMagicJSON(json, depth + 1, stats, '/'),
            type
        };
        if (hasStats) {
            result.__stats = stats;
        }
        return result;
    }
    if (!json || (type !== 'object' && type !== 'array') || isEmptyObject(json)) {
        if (typeof json === 'string' && json !== '') {
            stats.strings[json] = (stats.strings[json] || 0) + 1;
        }
        return json;
    }
    if (type === 'array') {
        return arrayToMagicJson(json, path, depth, stats);
    }
    if (type === 'object') {
        return (jsonToMagicJson(json, path, depth, stats));
    }
}
class MagicJson {
    constructor(json, options = (0, exports.getDefaultOptions)()) {
        this.options = options;
        this.doMagic(json);
    }
    doMagic(json) {
        this.json = json;
        this.jsonMagic = constructMagicJSON(json);
        this.stats = this.jsonMagic.__stats;
        return this;
    }
}
exports.MagicJson = MagicJson;
MagicJson.constructMetaJSON = (json) => constructMagicJSON(json);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.indexByField = exports.sortByField = exports.starPath = exports.hasArrayPath = exports.getArrayPathRegex = exports.isEmptyObject = void 0;
exports.hasShape = hasShape;
const isEmptyObject = (object) => (object !== null &&
    typeof object === 'object' &&
    (Array.isArray(object) ?
        object.length === 0 :
        Object.keys(object).length === 0));
exports.isEmptyObject = isEmptyObject;
const getArrayPathRegex = () => new RegExp(/\/(\d+)\//gi);
exports.getArrayPathRegex = getArrayPathRegex;
const hasArrayPath = (path) => ((0, exports.getArrayPathRegex)().test(path));
exports.hasArrayPath = hasArrayPath;
const starPath = (path, replaceWith = '/*/') => path.replace((0, exports.getArrayPathRegex)(), replaceWith);
exports.starPath = starPath;
function hasShape(subject = {}, shape = {}, path = '/', errors = []) {
    if (!Boolean(subject) || typeof subject !== 'object') {
        throw new Error('hasShape expects an object type');
    }
    const entrys = Object.entries(subject);
    if (entrys.length === 0)
        return (0, exports.isEmptyObject)(shape);
    return entrys.map(([key, value]) => {
        if (typeof (value || false) === 'object') {
            const bothIsObject = typeof (shape[key] || false) === 'object';
            errors.push(`mismatch on object types for field "${path}${key}"`);
            if (!bothIsObject)
                return false;
            return hasShape(value, shape[key], `${path}${key}/`, errors);
        }
        const equivResult = shape[key] === value;
        if (!equivResult) {
            errors.push(`mismatch on field "${key}" at ${path} [${[shape[key], value].join(':')}]`);
        }
        return equivResult;
    }).every(v => v);
}
const sortByField = (fieldName = '', order = 'asc') => (a, b) => {
    if (a[fieldName] < b[fieldName])
        return (order === 'asc' ? -1 : 1);
    if (a[fieldName] > b[fieldName])
        return (order === 'asc' ? 1 : -1);
    return 0;
};
exports.sortByField = sortByField;
const indexByField = (array = [], field) => {
    return array.reduce((acc, item) => {
        acc[item[field]] = item;
        return acc;
    }, {});
};
exports.indexByField = indexByField;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsR0FBRyxFQUFFLEVBQUUsUUFBUSxLQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0RixJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFKWSxtQkFBVyxlQUl2QjtBQUVNLE1BQU0sWUFBWSxHQUFHLENBQUksUUFBUSxFQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDMUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBTFksb0JBQVksZ0JBS3hCOzs7Ozs7O1VDbkREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY29yZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjb3JlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IGhhc0FycmF5UGF0aCwgc3RhclBhdGggfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXh0ZW5kZWRUeXBlID0gXCJzdHJpbmdcIiB8IFwibnVtYmVyXCIgfCBcImJpZ2ludFwiIHwgXCJib29sZWFuXCIgfCBcInN5bWJvbFwiIHwgXCJ1bmRlZmluZWRcIiB8IFwib2JqZWN0XCIgfCBcImZ1bmN0aW9uXCIgfCBcImFycmF5XCIgfCBcImFycmF5Y2VsbFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgSlNPTk1hZ2ljU3RyaWN0ID0gTWFnaWNWYWx1ZSB8IE1hZ2ljVmFsdWVbXTtcclxuZXhwb3J0IHR5cGUgSlNPTk1hZ2ljID0gSlNPTk1hZ2ljU3RyaWN0IHwgYW55IHwgYW55W107XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hZ2ljVmFsdWUge1xyXG4gIF9fc3RhdHM/OiBNZXRhU3RhdHM7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdmFsdWU6IEpTT05NYWdpYztcclxuICB0eXBlOiBFeHRlbmRlZFR5cGU7XHJcbiAgZGVwdGg/OiBudW1iZXI7XHJcbiAgcGF0aD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5TdGF0RW50cnkge1xyXG4gIGNvdW50OiBudW1iZXI7XHJcbiAgcGF0aHM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRJbmZvIHtcclxuICBjb3VudDogbnVtYmVyO1xyXG4gIHR5cGVzOiBSZWNvcmQ8RXh0ZW5kZWRUeXBlLCBudW1iZXI+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFTdGF0cyB7XHJcbiAgY29sdW1ucz86IHsgW2tleTogc3RyaW5nXTogQ29sdW1uU3RhdEVudHJ5IH07XHJcbiAgZmllbGRzPzogeyBba2V5OiBzdHJpbmddOiBGaWVsZEluZm8gfTtcclxuICB0eXBlcz86IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH07XHJcbiAgc3RyaW5ncz86IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFnaWNPcHRpb25zIHtcclxuICBzdGF0cz86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIHJldHVybnMgYXJyYXkgYXMgYSB0eXBlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRKU09OVHlwZShqc29uOiBhbnkpOiBFeHRlbmRlZFR5cGUge1xyXG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YganNvbjtcclxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheShqc29uKSkge1xyXG4gICAgcmV0dXJuICdhcnJheSc7XHJcbiAgfVxyXG4gIHJldHVybiB0eXBlICsgJycgYXMgRXh0ZW5kZWRUeXBlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmplY3Q6IGFueSkge1xyXG4gIHJldHVybiBCb29sZWFuKG9iamVjdCkgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRzKCk6IE1ldGFTdGF0cyB7XHJcbiAgcmV0dXJuICh7XHJcbiAgICBjb2x1bW5zOiB7fSxcclxuICAgIGZpZWxkczoge30sXHJcbiAgICB0eXBlczoge30sXHJcbiAgICBzdHJpbmdzOiB7fVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXREZWZhdWx0T3B0aW9ucyA9ICgpOiBNYWdpY09wdGlvbnMgPT4gKHtcclxuICBzdGF0czogZmFsc2VcclxufSlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWdpY0pzb25Ub0pzb24oanNvbjogSlNPTk1hZ2ljKTogYW55IHtcclxuICByZXR1cm4ge307XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheVRvTWFnaWNKc29uKGpzb246IGFueVtdLCBwYXRoID0gJycsIGRlcHRoID0gMCwgc3RhdHMgPSBnZXRFbXB0eVN0YXRzKCkpOiBKU09OTWFnaWMge1xyXG4gIGlmICghanNvbiB8fCAhQXJyYXkuaXNBcnJheShqc29uKSkgcmV0dXJuIGpzb247XHJcblxyXG4gIGNvbnN0IGlzQXJyYXlQYXRoID0gaGFzQXJyYXlQYXRoKHBhdGgpO1xyXG4gIGNvbnN0IGtleVBhdGggPSBpc0FycmF5UGF0aCA/IHN0YXJQYXRoKHBhdGggKyAnJykgOiBwYXRoO1xyXG5cclxuICByZXR1cm4ganNvbi5tYXAoKGVudHJ5LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgbmV4dFBhdGggPSBgJHtwYXRofSR7aW5kZXh9L2A7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3QgY29scyA9IE9iamVjdC5rZXlzKGVudHJ5KS5qb2luKCcsJyk7XHJcblxyXG4gICAgICBpZiAoc3RhdHMpIHtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbnMgfSA9IHN0YXRzO1xyXG4gICAgICAgIGlmIChjb2x1bW5zW2NvbHNdKSB7XHJcbiAgICAgICAgICBjb2x1bW5zW2NvbHNdLmNvdW50ICs9IDE7XHJcbiAgICAgICAgICBjb2x1bW5zW2NvbHNdLnBhdGhzW2tleVBhdGhdID0gKGNvbHVtbnNbY29sc10ucGF0aHNba2V5UGF0aF0gfHwgMCkgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbnNbY29sc10gPSB7IGNvdW50OiAxLCBwYXRoczogeyBba2V5UGF0aF06IDEgfSB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGVwdGgsXHJcbiAgICAgIGtleTogaW5kZXggKyAnJyxcclxuICAgICAgcGF0aDogbmV4dFBhdGgsXHJcbiAgICAgIHZhbHVlOiBjb25zdHJ1Y3RNYWdpY0pTT04oZW50cnksIGRlcHRoLCBzdGF0cywgbmV4dFBhdGgpLFxyXG4gICAgICB0eXBlOiAnYXJyYXljZWxsJ1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc29uVG9NYWdpY0pzb24oanNvbjogYW55LCBwYXRoID0gJycsIGRlcHRoID0gMCwgc3RhdHMgPSBnZXRFbXB0eVN0YXRzKCkpOiBKU09OTWFnaWMge1xyXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhqc29uKTtcclxuICBjb25zdCBpc0FycmF5UGF0aCA9IGhhc0FycmF5UGF0aChwYXRoKTtcclxuICBjb25zdCBrZXlQYXRoID0gaXNBcnJheVBhdGggPyBzdGFyUGF0aChwYXRoICsgJycpIDogcGF0aDtcclxuXHJcbiAgcmV0dXJuIGtleXMubWFwKChrZXkpID0+IHtcclxuICAgIGNvbnN0IG5leHRQYXRoID0gYCR7cGF0aH0ke2tleX0vYDtcclxuICAgIGNvbnN0IGtleWVkUGF0aCA9IGAke2tleVBhdGh9JHtrZXl9YDtcclxuICAgIGNvbnN0IHR5cGVOYW1lID0gZ2V0SlNPTlR5cGUoanNvbltrZXldKTtcclxuXHJcbiAgICBzdGF0cy5maWVsZHNba2V5ZWRQYXRoXSA9IHN0YXRzLmZpZWxkc1trZXllZFBhdGhdIHx8IHsgY291bnQ6IDAsIHR5cGVzOiB7fSB9IGFzIEZpZWxkSW5mbztcclxuICAgIHN0YXRzLmZpZWxkc1trZXllZFBhdGhdLmNvdW50ICs9IDE7XHJcbiAgICBzdGF0cy5maWVsZHNba2V5ZWRQYXRoXS50eXBlc1t0eXBlTmFtZV0gPSAoc3RhdHMuZmllbGRzW2tleWVkUGF0aF0udHlwZXNbdHlwZU5hbWVdIHx8IDApICsgMTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkZXB0aCxcclxuICAgICAga2V5LFxyXG4gICAgICBwYXRoOiBuZXh0UGF0aCxcclxuICAgICAgdHlwZTogdHlwZU5hbWUsXHJcbiAgICAgIHZhbHVlOiBjb25zdHJ1Y3RNYWdpY0pTT04oanNvbltrZXldLCBkZXB0aCArIDEsIHN0YXRzLCBuZXh0UGF0aCksXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0TWFnaWNKU09OKGpzb246IGFueSwgZGVwdGggPSAwLCBzdGF0cyA9IGdldEVtcHR5U3RhdHMoKSwgcGF0aCA9ICcnKTogTWFnaWNWYWx1ZSB8IE1hZ2ljVmFsdWVbXSB7XHJcbiAgY29uc3QgdHlwZSA9IGdldEpTT05UeXBlKGpzb24pO1xyXG4gIGNvbnN0IGhhc1N0YXRzID0gdHJ1ZTtcclxuICBcclxuICBpZiAocGF0aCA9PT0gJycpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHtcclxuICAgICAgZGVwdGgsXHJcbiAgICAgIGtleTogJ19yb290JyxcclxuICAgICAgcGF0aDogJycsXHJcbiAgICAgIHZhbHVlOiBjb25zdHJ1Y3RNYWdpY0pTT04oanNvbiwgZGVwdGggKyAxLCBzdGF0cywgJy8nKSxcclxuICAgICAgdHlwZVxyXG4gICAgfSBhcyBNYWdpY1ZhbHVlXHJcbiAgICBpZiAoaGFzU3RhdHMpIHtcclxuICAgICAgcmVzdWx0Ll9fc3RhdHMgPSBzdGF0cztcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBpZiAoIWpzb24gfHwgKHR5cGUgIT09ICdvYmplY3QnICYmIHR5cGUgIT09ICdhcnJheScpIHx8IGlzRW1wdHlPYmplY3QoanNvbikpIHtcclxuICAgIGlmICh0eXBlb2YganNvbiA9PT0gJ3N0cmluZycgJiYganNvbiAhPT0gJycpIHtcclxuICAgICAgc3RhdHMuc3RyaW5nc1tqc29uXSA9IChzdGF0cy5zdHJpbmdzW2pzb25dIHx8IDApICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcclxuICAgIHJldHVybiBhcnJheVRvTWFnaWNKc29uKGpzb24sIHBhdGgsIGRlcHRoLCBzdGF0cyk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiAoanNvblRvTWFnaWNKc29uKGpzb24sIHBhdGgsIGRlcHRoLCBzdGF0cykpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hZ2ljSnNvbiB7XHJcbiAganNvbk1hZ2ljOiBKU09OTWFnaWM7XHJcbiAganNvbjogYW55O1xyXG4gIHN0YXRzOiBhbnk7XHJcbiAgb3B0aW9uczogTWFnaWNPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihqc29uOiBhbnksIG9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5kb01hZ2ljKGpzb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnN0cnVjdE1ldGFKU09OID0gKGpzb246IGFueSkgPT4gY29uc3RydWN0TWFnaWNKU09OKGpzb24pO1xyXG5cclxuICBkb01hZ2ljKGpzb246IGFueSk6IE1hZ2ljSnNvbiB7XHJcbiAgICB0aGlzLmpzb24gPSBqc29uO1xyXG4gICAgdGhpcy5qc29uTWFnaWMgPSBjb25zdHJ1Y3RNYWdpY0pTT04oanNvbik7XHJcbiAgICB0aGlzLnN0YXRzID0gKHRoaXMuanNvbk1hZ2ljIGFzIE1hZ2ljVmFsdWUpLl9fc3RhdHM7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGlzRW1wdHlPYmplY3QgPSAob2JqZWN0KTogYm9vbGVhbiA9PiAoXHJcbiAgb2JqZWN0ICE9PSBudWxsICYmIFxyXG4gIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIFxyXG4gIChBcnJheS5pc0FycmF5KG9iamVjdCkgPyBcclxuICAgIG9iamVjdC5sZW5ndGggPT09IDAgOiBcclxuICAgIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09PSAwKVxyXG4pXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXJyYXlQYXRoUmVnZXggPSAoKSA9PiBuZXcgUmVnRXhwKC9cXC8oXFxkKylcXC8vZ2kpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhc0FycmF5UGF0aCA9IChwYXRoOiBzdHJpbmcpID0+IChnZXRBcnJheVBhdGhSZWdleCgpLnRlc3QocGF0aCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0YXJQYXRoID0gKHBhdGg6IHN0cmluZywgcmVwbGFjZVdpdGg6IHN0cmluZyA9ICcvKi8nKSA9PiBwYXRoLnJlcGxhY2UoZ2V0QXJyYXlQYXRoUmVnZXgoKSwgcmVwbGFjZVdpdGgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1NoYXBlKHN1YmplY3QgPSB7fSwgc2hhcGUgPSB7fSwgcGF0aCA9ICcvJywgZXJyb3JzID0gW10pOiBib29sZWFuIHtcclxuICBpZiAoIUJvb2xlYW4oc3ViamVjdCkgfHwgdHlwZW9mIHN1YmplY3QgIT09ICdvYmplY3QnKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hhc1NoYXBlIGV4cGVjdHMgYW4gb2JqZWN0IHR5cGUnKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZW50cnlzID0gT2JqZWN0LmVudHJpZXMoc3ViamVjdCk7XHJcbiAgaWYgKGVudHJ5cy5sZW5ndGggPT09IDApIHJldHVybiBpc0VtcHR5T2JqZWN0KHNoYXBlKTtcclxuXHJcbiAgcmV0dXJuIGVudHJ5cy5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgXHJcbiAgICBpZiAodHlwZW9mICh2YWx1ZSB8fCBmYWxzZSkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNvbnN0IGJvdGhJc09iamVjdCA9IHR5cGVvZiAoc2hhcGVba2V5XSB8fCBmYWxzZSkgPT09ICdvYmplY3QnO1xyXG4gICAgICBlcnJvcnMucHVzaChgbWlzbWF0Y2ggb24gb2JqZWN0IHR5cGVzIGZvciBmaWVsZCBcIiR7cGF0aH0ke2tleX1cImApXHJcbiAgICAgIGlmICghYm90aElzT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiBoYXNTaGFwZSh2YWx1ZSwgc2hhcGVba2V5XSwgYCR7cGF0aH0ke2tleX0vYCwgZXJyb3JzKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVxdWl2UmVzdWx0ID0gc2hhcGVba2V5XSA9PT0gdmFsdWU7XHJcbiAgICBpZiAoIWVxdWl2UmVzdWx0KSB7XHJcbiAgICAgIGVycm9ycy5wdXNoKGBtaXNtYXRjaCBvbiBmaWVsZCBcIiR7a2V5fVwiIGF0ICR7cGF0aH0gWyR7W3NoYXBlW2tleV0sIHZhbHVlXS5qb2luKCc6Jyl9XWApXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVxdWl2UmVzdWx0O1xyXG4gIH0pLmV2ZXJ5KHYgPT4gdik7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzb3J0QnlGaWVsZCA9IChmaWVsZE5hbWUgPSAnJywgb3JkZXIgPSAnYXNjJyBhcyAoJ2FzYyd8J2RlYycpKSA9PiAoYSwgYikgPT4ge1xyXG4gIGlmIChhW2ZpZWxkTmFtZV0gPCBiW2ZpZWxkTmFtZV0pIHJldHVybiAob3JkZXIgPT09ICdhc2MnID8gLTEgOiAxKTtcclxuICBpZiAoYVtmaWVsZE5hbWVdID4gYltmaWVsZE5hbWVdKSByZXR1cm4gKG9yZGVyID09PSAnYXNjJyA/IDEgOiAtMSk7XHJcbiAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpbmRleEJ5RmllbGQgPSA8VD4oYXJyYXkgPSBbXSBhcyBUW10sIGZpZWxkKSA9PiB7XHJcbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYWNjLCBpdGVtKSA9PiB7XHJcbiAgICBhY2NbaXRlbVtmaWVsZF1dID0gaXRlbTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pOyAgXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9