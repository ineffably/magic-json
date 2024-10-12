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
exports.deconstructMetaJSON = deconstructMetaJSON;
exports.constructMetaJSON = constructMetaJSON;
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
        cols: {},
        fields: {},
        types: {},
        strings: {}
    });
}
const getDefaultOptions = () => ({
    stats: false
});
exports.getDefaultOptions = getDefaultOptions;
function deconstructMetaJSON(json) {
    if (typeof json !== 'object') {
        return json;
    }
    const { key, value, type, depth, path } = json;
    if (type === 'arraycell') {
        if (typeof value === 'object') {
            const arrayCellResults = value.reduce((acc, entry) => {
                acc[entry.key] = deconstructMetaJSON(entry);
                return acc;
            }, {});
            return arrayCellResults;
        }
        return value;
    }
    if (type === 'object') {
        return value.reduce((acc, entry) => {
            if (entry.type === 'array') {
                acc[entry.key] = entry.value.map((innerEntry) => {
                    return deconstructMetaJSON(innerEntry);
                });
            }
            else if (entry.type === 'object') {
                acc[entry.key] = entry.value.reduce((acc, innerEntry) => {
                    acc[innerEntry.key] = deconstructMetaJSON(innerEntry);
                    return acc;
                }, {});
            }
            else {
                acc[entry.key] = entry.value;
            }
            return acc;
        }, {});
    }
    else {
        return value;
    }
}
function constructMetaJSON(json, options = (0, exports.getDefaultOptions)(), depth = 0, stats = getEmptyStats(), path = '') {
    const type = getJSONType(json);
    if (path === '') {
        const result = {
            depth,
            key: '_root',
            path: '',
            value: constructMetaJSON(json, options, depth + 1, stats, '/'),
            type
        };
        if (options.stats) {
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
        return json.map((entry, index) => {
            if (typeof entry === 'object') {
                const cols = Object.keys(entry).join(',') + `,${(0, utils_1.replaceNumericPath)(path, `[0-${json.length - 1}`)}]`;
                stats.cols[cols] = (stats.cols[cols] || 0) + 1;
            }
            const nextPath = `${path}${index}/`;
            return {
                depth,
                key: index + '',
                path: nextPath,
                value: constructMetaJSON(entry, options, depth, stats, nextPath),
                type: 'arraycell'
            };
        });
    }
    if (type === 'object') {
        const keys = Object.keys(json);
        return keys.map((key) => {
            stats.fields[key] = (stats.fields[key] || 0) + 1;
            const nextPath = `${path}${key}/`;
            return {
                depth,
                key,
                path: nextPath,
                type: getJSONType(json[key]),
                value: constructMetaJSON(json[key], options, depth + 1, stats, nextPath),
            };
        });
    }
}
class MagicJson {
    constructor(json) {
        this.doMagic(json);
    }
    doMagic(json) {
        this.json = json;
        this.jsonMeta = constructMetaJSON(json);
        this.stats = this.jsonMeta.__stats;
    }
}
exports.MagicJson = MagicJson;
MagicJson.constructJSONMeta = (json) => constructMetaJSON(json);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceNumericPath = exports.isEmptyObject = void 0;
exports.hasShape = hasShape;
const isEmptyObject = (object) => (Boolean(object) && typeof object === 'object' && Object.keys(object).length === 0);
exports.isEmptyObject = isEmptyObject;
const replaceNumericPath = (path, replaceWith = '*') => path.replace(/\d+/g, replaceWith);
exports.replaceNumericPath = replaceNumericPath;
function hasShape(subject = {}, shape = {}, path = '/', errors = []) {
    if (!Boolean(subject) || typeof subject !== 'object') {
        throw new Error('hasShape expects an object type');
    }
    const entrys = Object.entries(subject);
    if (entrys.length === 0)
        return (0, exports.isEmptyObject)(shape);
    const result = entrys.map(([key, value]) => {
        if (typeof (value || false) === 'object') {
            const bothIsObject = typeof (shape[key] || false) === 'object';
            errors.push(`mismatch on object types for field "${path}${key}"`);
            if (!bothIsObject)
                return false;
            return hasShape(shape[key], value, `${path}${key}/`, errors);
        }
        const equivResult = shape[key] === value;
        if (!equivResult) {
            errors.push(`mismatch on field "${key}" at ${path} [${[shape[key], value].join(':')}]`);
        }
        return equivResult;
    });
    return result.every(v => v);
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ2hDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixDQUFDOzs7Ozs7O1VDN0JEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9jb3JlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NvcmUvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29yZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY29yZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjb3JlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IHJlcGxhY2VOdW1lcmljUGF0aCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHRlbmRlZFR5cGUgPSBcInN0cmluZ1wiIHwgXCJudW1iZXJcIiB8IFwiYmlnaW50XCIgfCBcImJvb2xlYW5cIiB8IFwic3ltYm9sXCIgfCBcInVuZGVmaW5lZFwiIHwgXCJvYmplY3RcIiB8IFwiZnVuY3Rpb25cIiB8IFwiYXJyYXlcIiB8IFwiYXJyYXljZWxsXCI7XHJcblxyXG5leHBvcnQgdHlwZSBKU09OTWV0YSA9IE1ldGFWYWx1ZSB8IE1ldGFWYWx1ZVtdO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNZXRhVmFsdWUge1xyXG4gIF9fc3RhdHM/OiBNZXRhU3RhdHM7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdmFsdWU6IE1ldGFWYWx1ZSB8IE1ldGFWYWx1ZVtdIHwgYW55IHwgYW55W107XHJcbiAgdHlwZTogRXh0ZW5kZWRUeXBlO1xyXG4gIGRlcHRoPzogbnVtYmVyO1xyXG4gIHBhdGg/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVN0YXRzIHtcclxuICBjb2xzPzogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfTtcclxuICBmaWVsZHM/OiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9O1xyXG4gIHR5cGVzPzogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfTtcclxuICBzdHJpbmdzPzogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfTtcclxufVxyXG5cclxuLy8gcmV0dXJucyBhcnJheSBhcyBhIHR5cGVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT05UeXBlKGpzb246IGFueSk6IEV4dGVuZGVkVHlwZSB7XHJcbiAgY29uc3QgdHlwZSA9IHR5cGVvZiBqc29uO1xyXG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KGpzb24pKSB7XHJcbiAgICByZXR1cm4gJ2FycmF5JztcclxuICB9XHJcbiAgcmV0dXJuIHR5cGUgKyAnJyBhcyBFeHRlbmRlZFR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iamVjdDogYW55KSB7XHJcbiAgcmV0dXJuIEJvb2xlYW4ob2JqZWN0KSAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdHMoKTogTWV0YVN0YXRzIHtcclxuICByZXR1cm4gKHtcclxuICAgIGNvbHM6IHt9LFxyXG4gICAgZmllbGRzOiB7fSxcclxuICAgIHR5cGVzOiB7fSxcclxuICAgIHN0cmluZ3M6IHt9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRPcHRpb25zID0gKCkgPT4gKHtcclxuICBzdGF0czogZmFsc2VcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVjb25zdHJ1Y3RNZXRhSlNPTihqc29uOiBNZXRhVmFsdWUgfCBNZXRhVmFsdWVbXSk6IGFueSB7XHJcbiAgLy8gY29uc29sZS5sb2coJ2luY29taW5nOmpzb246JywgSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgMikpO1xyXG5cclxuICBpZiAodHlwZW9mIGpzb24gIT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsga2V5LCB2YWx1ZSwgdHlwZSwgZGVwdGgsIHBhdGggfSA9IGpzb24gYXMgTWV0YVZhbHVlO1xyXG5cclxuICBpZih0eXBlID09PSAnYXJyYXljZWxsJykge1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBjb25zdCBhcnJheUNlbGxSZXN1bHRzID0gdmFsdWUucmVkdWNlKChhY2MsIGVudHJ5KSA9PiB7XHJcbiAgICAgICAgYWNjW2VudHJ5LmtleV0gPSBkZWNvbnN0cnVjdE1ldGFKU09OKGVudHJ5KTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCB7fSlcclxuICAgICAgcmV0dXJuIGFycmF5Q2VsbFJlc3VsdHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiB2YWx1ZS5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcclxuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdhcnJheScpIHtcclxuICAgICAgICBhY2NbZW50cnkua2V5XSA9IGVudHJ5LnZhbHVlLm1hcCgoaW5uZXJFbnRyeSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGRlY29uc3RydWN0TWV0YUpTT04oaW5uZXJFbnRyeSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChlbnRyeS50eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGFjY1tlbnRyeS5rZXldID0gZW50cnkudmFsdWUucmVkdWNlKChhY2MsIGlubmVyRW50cnkpID0+IHtcclxuICAgICAgICAgIGFjY1tpbm5lckVudHJ5LmtleV0gPSBkZWNvbnN0cnVjdE1ldGFKU09OKGlubmVyRW50cnkpO1xyXG4gICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSBhcyBhbnkpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGFjY1tlbnRyeS5rZXldID0gZW50cnkudmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RNZXRhSlNPTihqc29uOiBhbnksIG9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpLCBkZXB0aCA9IDAsIHN0YXRzID0gZ2V0RW1wdHlTdGF0cygpLCBwYXRoID0gJycpOiBNZXRhVmFsdWUgfCBNZXRhVmFsdWVbXSB8IGFueSB8IGFueVtdIHtcclxuICBjb25zdCB0eXBlID0gZ2V0SlNPTlR5cGUoanNvbik7XHJcblxyXG4gIGlmIChwYXRoID09PSAnJykge1xyXG4gICAgY29uc3QgcmVzdWx0ID0ge1xyXG4gICAgICBkZXB0aCxcclxuICAgICAga2V5OiAnX3Jvb3QnLFxyXG4gICAgICBwYXRoOiAnJyxcclxuICAgICAgdmFsdWU6IGNvbnN0cnVjdE1ldGFKU09OKGpzb24sIG9wdGlvbnMsIGRlcHRoICsgMSwgc3RhdHMsICcvJyksXHJcbiAgICAgIHR5cGVcclxuICAgIH0gYXMgTWV0YVZhbHVlXHJcbiAgICBpZihvcHRpb25zLnN0YXRzKSB7XHJcbiAgICAgIHJlc3VsdC5fX3N0YXRzID0gc3RhdHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgaWYgKCFqc29uIHx8ICh0eXBlICE9PSAnb2JqZWN0JyAmJiB0eXBlICE9PSAnYXJyYXknKSB8fCBpc0VtcHR5T2JqZWN0KGpzb24pKSB7XHJcbiAgICBpZih0eXBlb2YganNvbiA9PT0gJ3N0cmluZycgJiYganNvbiAhPT0gJycpIHtcclxuICAgICAgc3RhdHMuc3RyaW5nc1tqc29uXSA9IChzdGF0cy5zdHJpbmdzW2pzb25dIHx8IDApICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcclxuICAgIHJldHVybiBqc29uLm1hcCgoZW50cnksIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBjb2xzID0gT2JqZWN0LmtleXMoZW50cnkpLmpvaW4oJywnKSArIGAsJHtyZXBsYWNlTnVtZXJpY1BhdGgocGF0aCwgYFswLSR7anNvbi5sZW5ndGggLSAxfWApfV1gO1xyXG4gICAgICAgIHN0YXRzLmNvbHNbY29sc10gPSAoc3RhdHMuY29sc1tjb2xzXSB8fCAwKSArIDE7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dFBhdGggPSBgJHtwYXRofSR7aW5kZXh9L2A7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVwdGgsXHJcbiAgICAgICAga2V5OiBpbmRleCArICcnLFxyXG4gICAgICAgIHBhdGg6IG5leHRQYXRoLFxyXG4gICAgICAgIHZhbHVlOiBjb25zdHJ1Y3RNZXRhSlNPTihlbnRyeSwgb3B0aW9ucywgZGVwdGgsIHN0YXRzLCBuZXh0UGF0aCksXHJcbiAgICAgICAgdHlwZTogJ2FycmF5Y2VsbCdcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGpzb24pO1xyXG4gICAgcmV0dXJuIGtleXMubWFwKChrZXkpID0+IHtcclxuICAgICAgc3RhdHMuZmllbGRzW2tleV0gPSAoc3RhdHMuZmllbGRzW2tleV0gfHwgMCkgKyAxO1xyXG4gICAgICBjb25zdCBuZXh0UGF0aCA9IGAke3BhdGh9JHtrZXl9L2A7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVwdGgsXHJcbiAgICAgICAga2V5LFxyXG4gICAgICAgIHBhdGg6IG5leHRQYXRoLFxyXG4gICAgICAgIHR5cGU6IGdldEpTT05UeXBlKGpzb25ba2V5XSksXHJcbiAgICAgICAgdmFsdWU6IGNvbnN0cnVjdE1ldGFKU09OKGpzb25ba2V5XSwgb3B0aW9ucywgZGVwdGggKyAxLCBzdGF0cywgbmV4dFBhdGgpLFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYWdpY0pzb24ge1xyXG4gIGpzb25NZXRhOiBKU09OTWV0YTtcclxuICBqc29uOiBhbnk7XHJcbiAgc3RhdHM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoanNvbjogYW55KSB7XHJcbiAgICB0aGlzLmRvTWFnaWMoanNvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29uc3RydWN0SlNPTk1ldGEgPSAoanNvbjogYW55KSA9PiBjb25zdHJ1Y3RNZXRhSlNPTihqc29uKTtcclxuXHJcbiAgZG9NYWdpYyhqc29uOiBhbnkpIHtcclxuICAgIHRoaXMuanNvbiA9IGpzb247XHJcbiAgICB0aGlzLmpzb25NZXRhID0gY29uc3RydWN0TWV0YUpTT04oanNvbik7XHJcbiAgICB0aGlzLnN0YXRzID0gKHRoaXMuanNvbk1ldGEgYXMgTWV0YVZhbHVlKS5fX3N0YXRzO1xyXG4gIH1cclxufSIsIlxyXG5leHBvcnQgY29uc3QgaXNFbXB0eU9iamVjdCA9IChvYmplY3QpOiBib29sZWFuID0+IChcclxuICBCb29sZWFuKG9iamVjdCkgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT09IDBcclxuKVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlcGxhY2VOdW1lcmljUGF0aCA9IChwYXRoOiBzdHJpbmcsIHJlcGxhY2VXaXRoOiBzdHJpbmcgPSAnKicpID0+IHBhdGgucmVwbGFjZSgvXFxkKy9nLCByZXBsYWNlV2l0aCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzU2hhcGUoc3ViamVjdCA9IHt9LCBzaGFwZSA9IHt9LCBwYXRoID0gJy8nLCBlcnJvcnMgPSBbXSk6IGJvb2xlYW4ge1xyXG4gIGlmICghQm9vbGVhbihzdWJqZWN0KSB8fCB0eXBlb2Ygc3ViamVjdCAhPT0gJ29iamVjdCcpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaGFzU2hhcGUgZXhwZWN0cyBhbiBvYmplY3QgdHlwZScpXHJcbiAgfVxyXG5cclxuICBjb25zdCBlbnRyeXMgPSBPYmplY3QuZW50cmllcyhzdWJqZWN0KTtcclxuICBpZiAoZW50cnlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGlzRW1wdHlPYmplY3Qoc2hhcGUpO1xyXG5cclxuICBjb25zdCByZXN1bHQgPSBlbnRyeXMubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIGlmICh0eXBlb2YgKHZhbHVlIHx8IGZhbHNlKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3QgYm90aElzT2JqZWN0ID0gdHlwZW9mIChzaGFwZVtrZXldIHx8IGZhbHNlKSA9PT0gJ29iamVjdCc7XHJcbiAgICAgIGVycm9ycy5wdXNoKGBtaXNtYXRjaCBvbiBvYmplY3QgdHlwZXMgZm9yIGZpZWxkIFwiJHtwYXRofSR7a2V5fVwiYClcclxuICAgICAgaWYgKCFib3RoSXNPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIGhhc1NoYXBlKHNoYXBlW2tleV0sIHZhbHVlLCBgJHtwYXRofSR7a2V5fS9gLCBlcnJvcnMpXHJcbiAgICB9XHJcbiAgICBjb25zdCBlcXVpdlJlc3VsdCA9IHNoYXBlW2tleV0gPT09IHZhbHVlO1xyXG4gICAgaWYgKCFlcXVpdlJlc3VsdCkge1xyXG4gICAgICBlcnJvcnMucHVzaChgbWlzbWF0Y2ggb24gZmllbGQgXCIke2tleX1cIiBhdCAke3BhdGh9IFske1tzaGFwZVtrZXldLCB2YWx1ZV0uam9pbignOicpfV1gKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVxdWl2UmVzdWx0O1xyXG4gIH0pXHJcbiAgcmV0dXJuIHJlc3VsdC5ldmVyeSh2ID0+IHYpO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9