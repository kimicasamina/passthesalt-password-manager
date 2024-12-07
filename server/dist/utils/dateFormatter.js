"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = exports.formatDateShort = exports.formatDate = void 0;
var formatDate = exports.formatDate = function formatDate(date) {
  var formattedDate = new Date(date);
  var options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    weekday: 'short'
  };
  return formattedDate.toLocaleDateString('en-GB', options);
};
var formatDateShort = exports.formatDateShort = function formatDateShort(date) {
  var formattedDate = new Date(date);
  var options = {
    // month: "short",
    day: '2-digit',
    weekday: 'short'
    // year: "numeric",
  };
  return formattedDate.toLocaleDateString('en-GB', options);
};
var formatTime = exports.formatTime = function formatTime(date) {
  var formattedTime = new Date(date);
  var options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return formattedTime.toLocaleTimeString('en-us', options);
};