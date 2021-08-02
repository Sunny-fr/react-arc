"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var commons = {
  /**
   * @param {ARCConfig} ARCConfig
   * @param {object} rest
   * @return {{type: string, message: string}}
   */
  cancelRequestPayload: function cancelRequestPayload(_ref) {
    var _ref$ARCConfig = _ref.ARCConfig,
        ARCConfig = _ref$ARCConfig === undefined ? {} : _ref$ARCConfig,
        rest = _objectWithoutProperties(_ref, ["ARCConfig"]);

    return {
      type: "ARC:Cancel",
      message: "ARC: Cancel request due to unmount (reducer: " + (ARCConfig.name || "Unknown reducer") + ")"
    };
  }
};
exports.default = commons;