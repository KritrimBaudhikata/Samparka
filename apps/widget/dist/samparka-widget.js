/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SamparkaWidget"] = factory();
	else
		root["SamparkaWidget"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"../../node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"../../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.samparka-widget {\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\r\n  position: fixed;\r\n  bottom: 20px;\r\n  right: 20px;\r\n  z-index: 10000;\r\n  max-width: 400px;\r\n  width: 100%;\r\n}\r\n\r\n.samparka-widget * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.samparka-widget-button {\r\n  background: #3b82f6;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 50px;\r\n  width: 60px;\r\n  height: 60px;\r\n  cursor: pointer;\r\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\r\n  transition: all 0.3s ease;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 24px;\r\n}\r\n\r\n.samparka-widget-button:hover {\r\n  background: #2563eb;\r\n  transform: scale(1.05);\r\n}\r\n\r\n.samparka-widget-panel {\r\n  background: white;\r\n  border-radius: 12px;\r\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\r\n  border: 1px solid #e5e7eb;\r\n  overflow: hidden;\r\n  margin-bottom: 12px;\r\n  max-height: 500px;\r\n  width: 350px;\r\n}\r\n\r\n.samparka-widget-header {\r\n  background: #f9fafb;\r\n  padding: 16px;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n}\r\n\r\n.samparka-widget-title {\r\n  font-weight: 600;\r\n  color: #111827;\r\n  margin: 0;\r\n  font-size: 16px;\r\n}\r\n\r\n.samparka-widget-close {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  color: #6b7280;\r\n  font-size: 20px;\r\n  padding: 0;\r\n  width: 24px;\r\n  height: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.samparka-widget-close:hover {\r\n  color: #374151;\r\n}\r\n\r\n.samparka-widget-messages {\r\n  padding: 16px;\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 12px;\r\n}\r\n\r\n.samparka-widget-message {\r\n  display: flex;\r\n  align-items: flex-start;\r\n  gap: 8px;\r\n}\r\n\r\n.samparka-widget-message-user {\r\n  flex-direction: row-reverse;\r\n}\r\n\r\n.samparka-widget-message-avatar {\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 14px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.samparka-widget-message-avatar-assistant {\r\n  background: #e5e7eb;\r\n  color: #374151;\r\n}\r\n\r\n.samparka-widget-message-avatar-user {\r\n  background: #3b82f6;\r\n  color: white;\r\n}\r\n\r\n.samparka-widget-message-content {\r\n  max-width: 80%;\r\n  padding: 8px 12px;\r\n  border-radius: 12px;\r\n  font-size: 14px;\r\n  line-height: 1.4;\r\n}\r\n\r\n.samparka-widget-message-content-assistant {\r\n  background: #f3f4f6;\r\n  color: #374151;\r\n}\r\n\r\n.samparka-widget-message-content-user {\r\n  background: #3b82f6;\r\n  color: white;\r\n}\r\n\r\n.samparka-widget-input {\r\n  padding: 16px;\r\n  border-top: 1px solid #e5e7eb;\r\n  display: flex;\r\n  gap: 8px;\r\n}\r\n\r\n.samparka-widget-input input {\r\n  flex: 1;\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  font-size: 14px;\r\n  outline: none;\r\n}\r\n\r\n.samparka-widget-input input:focus {\r\n  border-color: #3b82f6;\r\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\r\n}\r\n\r\n.samparka-widget-input button {\r\n  background: #3b82f6;\r\n  color: white;\r\n  border: none;\r\n  border-radius: 8px;\r\n  padding: 8px 12px;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.samparka-widget-input button:hover {\r\n  background: #2563eb;\r\n}\r\n\r\n.samparka-widget-input button:disabled {\r\n  background: #9ca3af;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.samparka-widget-loading {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 8px 12px;\r\n  background: #f3f4f6;\r\n  border-radius: 12px;\r\n  color: #6b7280;\r\n  font-size: 14px;\r\n}\r\n\r\n.samparka-widget-loading-dots {\r\n  display: flex;\r\n  gap: 4px;\r\n}\r\n\r\n.samparka-widget-loading-dot {\r\n  width: 6px;\r\n  height: 6px;\r\n  background: #9ca3af;\r\n  border-radius: 50%;\r\n  animation: samparka-bounce 1.4s ease-in-out infinite both;\r\n}\r\n\r\n.samparka-widget-loading-dot:nth-child(1) {\r\n  animation-delay: -0.32s;\r\n}\r\n\r\n.samparka-widget-loading-dot:nth-child(2) {\r\n  animation-delay: -0.16s;\r\n}\r\n\r\n@keyframes samparka-bounce {\r\n  0%, 80%, 100% {\r\n    transform: scale(0);\r\n  }\r\n  40% {\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n.samparka-widget-confirmation {\r\n  padding: 16px;\r\n  background: #eff6ff;\r\n  border-top: 1px solid #e5e7eb;\r\n}\r\n\r\n.samparka-widget-confirmation-title {\r\n  font-weight: 600;\r\n  color: #1e40af;\r\n  margin: 0 0 8px 0;\r\n  font-size: 14px;\r\n}\r\n\r\n.samparka-widget-confirmation-data {\r\n  background: white;\r\n  border: 1px solid #dbeafe;\r\n  border-radius: 8px;\r\n  padding: 12px;\r\n  font-size: 12px;\r\n  color: #374151;\r\n  margin-bottom: 12px;\r\n  max-height: 150px;\r\n  overflow-y: auto;\r\n}\r\n\r\n.samparka-widget-confirmation-buttons {\r\n  display: flex;\r\n  gap: 8px;\r\n}\r\n\r\n.samparka-widget-confirmation-button {\r\n  flex: 1;\r\n  padding: 8px 12px;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.samparka-widget-confirmation-button-primary {\r\n  background: #3b82f6;\r\n  color: white;\r\n  border: none;\r\n}\r\n\r\n.samparka-widget-confirmation-button-primary:hover {\r\n  background: #2563eb;\r\n}\r\n\r\n.samparka-widget-confirmation-button-secondary {\r\n  background: white;\r\n  color: #374151;\r\n  border: 1px solid #d1d5db;\r\n}\r\n\r\n.samparka-widget-confirmation-button-secondary:hover {\r\n  background: #f9fafb;\r\n}\r\n\r\n.samparka-widget-success {\r\n  padding: 16px;\r\n  text-align: center;\r\n  background: #f0fdf4;\r\n  border-top: 1px solid #e5e7eb;\r\n}\r\n\r\n.samparka-widget-success-icon {\r\n  color: #16a34a;\r\n  font-size: 24px;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.samparka-widget-success-message {\r\n  color: #166534;\r\n  font-weight: 500;\r\n  margin: 0;\r\n  font-size: 14px;\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .samparka-widget {\r\n    bottom: 10px;\r\n    right: 10px;\r\n    left: 10px;\r\n    max-width: none;\r\n  }\r\n  \r\n  .samparka-widget-panel {\r\n    width: 100%;\r\n    max-height: 400px;\r\n  }\r\n}\r\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://SamparkaWidget/./src/styles.css?../../node_modules/css-loader/dist/cjs.js\n}");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("{\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/css-loader/dist/runtime/api.js?\n}");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \******************************************************************/
/***/ ((module) => {

eval("{\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/css-loader/dist/runtime/noSourceMaps.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {

eval("{\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {

eval("{\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/insertBySelector.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/insertStyleElement.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/styleDomAPI.js?\n}");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://SamparkaWidget/../../node_modules/style-loader/dist/runtime/styleTagTransform.js?\n}");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SamparkaWidget = void 0;\nvar widget_1 = __webpack_require__(/*! ./widget */ \"./src/widget.ts\");\nObject.defineProperty(exports, \"SamparkaWidget\", ({ enumerable: true, get: function () { return widget_1.SamparkaWidget; } }));\n\n\n//# sourceURL=webpack://SamparkaWidget/./src/index.ts?\n}");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"../../node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"../../node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"../../node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"../../node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"../../node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://SamparkaWidget/./src/styles.css?\n}");

/***/ }),

/***/ "./src/widget.ts":
/*!***********************!*\
  !*** ./src/widget.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SamparkaWidget = void 0;\n__webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nclass SamparkaWidget {\n    constructor(config) {\n        this.messages = [];\n        this.isOpen = false;\n        this.isLoading = false;\n        this.isComplete = false;\n        this.structuredData = null;\n        this.config = config;\n        this.sessionId = this.generateId();\n        this.createWidget();\n        this.attachEventListeners();\n    }\n    generateId() {\n        return 'samparka-' + Math.random().toString(36).substr(2, 9);\n    }\n    createWidget() {\n        // Create container\n        this.container = document.createElement('div');\n        this.container.className = 'samparka-widget';\n        this.container.id = this.generateId();\n        // Create button\n        this.button = document.createElement('button');\n        this.button.className = 'samparka-widget-button';\n        this.button.innerHTML = '💬';\n        this.button.setAttribute('aria-label', 'Open chat');\n        // Create panel\n        this.panel = this.createPanel();\n        // Append to container\n        this.container.appendChild(this.panel);\n        this.container.appendChild(this.button);\n        // Append to body\n        document.body.appendChild(this.container);\n    }\n    createPanel() {\n        const panel = document.createElement('div');\n        panel.className = 'samparka-widget-panel';\n        panel.style.display = 'none';\n        // Header\n        const header = document.createElement('div');\n        header.className = 'samparka-widget-header';\n        const title = document.createElement('h3');\n        title.className = 'samparka-widget-title';\n        title.textContent = 'AI Assistant';\n        const closeButton = document.createElement('button');\n        closeButton.className = 'samparka-widget-close';\n        closeButton.innerHTML = '×';\n        closeButton.setAttribute('aria-label', 'Close chat');\n        header.appendChild(title);\n        header.appendChild(closeButton);\n        // Messages container\n        const messagesContainer = document.createElement('div');\n        messagesContainer.className = 'samparka-widget-messages';\n        // Input container\n        const inputContainer = document.createElement('div');\n        inputContainer.className = 'samparka-widget-input';\n        const input = document.createElement('input');\n        input.type = 'text';\n        input.placeholder = 'Type your message...';\n        input.setAttribute('aria-label', 'Message input');\n        const sendButton = document.createElement('button');\n        sendButton.textContent = 'Send';\n        sendButton.setAttribute('aria-label', 'Send message');\n        inputContainer.appendChild(input);\n        inputContainer.appendChild(sendButton);\n        // Assemble panel\n        panel.appendChild(header);\n        panel.appendChild(messagesContainer);\n        panel.appendChild(inputContainer);\n        return panel;\n    }\n    attachEventListeners() {\n        // Button click\n        this.button.addEventListener('click', () => {\n            this.togglePanel();\n        });\n        // Close button\n        const closeButton = this.panel.querySelector('.samparka-widget-close');\n        closeButton?.addEventListener('click', () => {\n            this.closePanel();\n        });\n        // Send button and input\n        const input = this.panel.querySelector('input');\n        const sendButton = this.panel.querySelector('button[aria-label=\"Send message\"]');\n        const sendMessage = () => {\n            const message = input.value.trim();\n            if (message && !this.isLoading) {\n                this.sendMessage(message);\n                input.value = '';\n            }\n        };\n        sendButton?.addEventListener('click', sendMessage);\n        input?.addEventListener('keypress', (e) => {\n            if (e.key === 'Enter') {\n                e.preventDefault();\n                sendMessage();\n            }\n        });\n    }\n    togglePanel() {\n        if (this.isOpen) {\n            this.closePanel();\n        }\n        else {\n            this.openPanel();\n        }\n    }\n    openPanel() {\n        this.panel.style.display = 'block';\n        this.isOpen = true;\n        this.button.style.display = 'none';\n        // Add welcome message if no messages\n        if (this.messages.length === 0) {\n            this.addMessage('assistant', 'Hello! I\\'m here to help you. How can I assist you today?');\n        }\n    }\n    closePanel() {\n        this.panel.style.display = 'none';\n        this.isOpen = false;\n        this.button.style.display = 'flex';\n    }\n    addMessage(role, content) {\n        const message = {\n            id: this.generateId(),\n            role,\n            content,\n            timestamp: new Date(),\n        };\n        this.messages.push(message);\n        this.renderMessages();\n    }\n    renderMessages() {\n        const messagesContainer = this.panel.querySelector('.samparka-widget-messages');\n        messagesContainer.innerHTML = '';\n        this.messages.forEach((message) => {\n            const messageElement = this.createMessageElement(message);\n            messagesContainer.appendChild(messageElement);\n        });\n        // Scroll to bottom\n        messagesContainer.scrollTop = messagesContainer.scrollHeight;\n    }\n    createMessageElement(message) {\n        const messageDiv = document.createElement('div');\n        messageDiv.className = `samparka-widget-message ${message.role === 'user' ? 'samparka-widget-message-user' : ''}`;\n        const avatar = document.createElement('div');\n        avatar.className = `samparka-widget-message-avatar ${message.role === 'user'\n            ? 'samparka-widget-message-avatar-user'\n            : 'samparka-widget-message-avatar-assistant'}`;\n        avatar.textContent = message.role === 'user' ? 'U' : 'A';\n        const content = document.createElement('div');\n        content.className = `samparka-widget-message-content ${message.role === 'user'\n            ? 'samparka-widget-message-content-user'\n            : 'samparka-widget-message-content-assistant'}`;\n        content.textContent = message.content;\n        messageDiv.appendChild(avatar);\n        messageDiv.appendChild(content);\n        return messageDiv;\n    }\n    async sendMessage(message) {\n        this.addMessage('user', message);\n        this.setLoading(true);\n        try {\n            const response = await fetch(`${this.config.apiUrl}/api/chat/chat`, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json',\n                },\n                body: JSON.stringify({\n                    sessionId: this.sessionId,\n                    useCase: this.config.useCase,\n                    message,\n                }),\n            });\n            const data = await response.json();\n            if (data.success) {\n                this.addMessage('assistant', data.data.message);\n                if (data.data.isComplete && data.data.structuredData) {\n                    this.structuredData = data.data.structuredData;\n                    this.isComplete = true;\n                    this.showConfirmation();\n                }\n            }\n            else {\n                this.addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');\n            }\n        }\n        catch (error) {\n            console.error('Widget API error:', error);\n            this.addMessage('assistant', 'I apologize, but I encountered an error. Please try again.');\n        }\n        finally {\n            this.setLoading(false);\n        }\n    }\n    setLoading(loading) {\n        this.isLoading = loading;\n        const input = this.panel.querySelector('input');\n        const sendButton = this.panel.querySelector('button[aria-label=\"Send message\"]');\n        if (loading) {\n            input.disabled = true;\n            sendButton.disabled = true;\n            sendButton.textContent = 'Sending...';\n            this.showLoadingMessage();\n        }\n        else {\n            input.disabled = false;\n            sendButton.disabled = false;\n            sendButton.textContent = 'Send';\n            this.hideLoadingMessage();\n        }\n    }\n    showLoadingMessage() {\n        const messagesContainer = this.panel.querySelector('.samparka-widget-messages');\n        const loadingDiv = document.createElement('div');\n        loadingDiv.className = 'samparka-widget-loading';\n        loadingDiv.innerHTML = `\r\n      <div class=\"samparka-widget-loading-dots\">\r\n        <div class=\"samparka-widget-loading-dot\"></div>\r\n        <div class=\"samparka-widget-loading-dot\"></div>\r\n        <div class=\"samparka-widget-loading-dot\"></div>\r\n      </div>\r\n      <span>AI is thinking...</span>\r\n    `;\n        loadingDiv.id = 'samparka-loading';\n        messagesContainer.appendChild(loadingDiv);\n        messagesContainer.scrollTop = messagesContainer.scrollHeight;\n    }\n    hideLoadingMessage() {\n        const loadingElement = document.getElementById('samparka-loading');\n        loadingElement?.remove();\n    }\n    showConfirmation() {\n        const inputContainer = this.panel.querySelector('.samparka-widget-input');\n        inputContainer.style.display = 'none';\n        const confirmationDiv = document.createElement('div');\n        confirmationDiv.className = 'samparka-widget-confirmation';\n        confirmationDiv.innerHTML = `\r\n      <h4 class=\"samparka-widget-confirmation-title\">Please confirm your information:</h4>\r\n      <div class=\"samparka-widget-confirmation-data\">\r\n        <pre>${JSON.stringify(this.structuredData, null, 2)}</pre>\r\n      </div>\r\n      <div class=\"samparka-widget-confirmation-buttons\">\r\n        <button class=\"samparka-widget-confirmation-button samparka-widget-confirmation-button-secondary\" id=\"samparka-edit\">\r\n          Edit\r\n        </button>\r\n        <button class=\"samparka-widget-confirmation-button samparka-widget-confirmation-button-primary\" id=\"samparka-submit\">\r\n          Submit\r\n        </button>\r\n      </div>\r\n    `;\n        this.panel.appendChild(confirmationDiv);\n        // Add event listeners\n        document.getElementById('samparka-edit')?.addEventListener('click', () => {\n            this.isComplete = false;\n            this.structuredData = null;\n            confirmationDiv.remove();\n            inputContainer.style.display = 'flex';\n        });\n        document.getElementById('samparka-submit')?.addEventListener('click', () => {\n            this.submitForm();\n        });\n    }\n    async submitForm() {\n        try {\n            // Confirm submission\n            const confirmResponse = await fetch(`${this.config.apiUrl}/api/chat/confirm`, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json',\n                },\n                body: JSON.stringify({\n                    sessionId: this.sessionId,\n                    data: this.structuredData,\n                }),\n            });\n            const confirmData = await confirmResponse.json();\n            if (confirmData.success) {\n                // Create lead\n                const leadResponse = await fetch(`${this.config.apiUrl}/api/leads`, {\n                    method: 'POST',\n                    headers: {\n                        'Content-Type': 'application/json',\n                    },\n                    body: JSON.stringify({\n                        useCase: this.config.useCase,\n                        data: this.structuredData,\n                        source: this.config.source,\n                    }),\n                });\n                const leadData = await leadResponse.json();\n                if (leadData.success) {\n                    this.showSuccess();\n                }\n                else {\n                    throw new Error(leadData.error || 'Failed to create lead');\n                }\n            }\n            else {\n                throw new Error(confirmData.error || 'Failed to confirm submission');\n            }\n        }\n        catch (error) {\n            console.error('Submission error:', error);\n            this.addMessage('assistant', 'I apologize, but there was an error submitting your information. Please try again.');\n        }\n    }\n    showSuccess() {\n        const confirmationDiv = this.panel.querySelector('.samparka-widget-confirmation');\n        confirmationDiv.remove();\n        const successDiv = document.createElement('div');\n        successDiv.className = 'samparka-widget-success';\n        successDiv.innerHTML = `\r\n      <div class=\"samparka-widget-success-icon\">✅</div>\r\n      <p class=\"samparka-widget-success-message\">\r\n        Thank you! Your information has been submitted successfully. We'll get back to you soon!\r\n      </p>\r\n    `;\n        this.panel.appendChild(successDiv);\n        // Auto-close after 3 seconds\n        setTimeout(() => {\n            this.closePanel();\n        }, 3000);\n    }\n    destroy() {\n        this.container.remove();\n    }\n}\nexports.SamparkaWidget = SamparkaWidget;\nwindow.SamparkaWidget = SamparkaWidget;\n\n\n//# sourceURL=webpack://SamparkaWidget/./src/widget.ts?\n}");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});