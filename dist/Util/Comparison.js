"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSame = exports.isFuture = exports.isPast = exports.isAfter = exports.isBefore = void 0;
const HTime_1 = require("@/Core/HTime");
const COMPARISON_ACCURACY = [
    'year',
    'month',
    'day',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
];
function isBefore(date, comparison) {
    return date.epochMilliseconds < comparison.epochMilliseconds;
}
exports.isBefore = isBefore;
function isAfter(date, comparison) {
    return date.epochMilliseconds > comparison.epochMilliseconds;
}
exports.isAfter = isAfter;
function isPast(date) {
    return isBefore(date, (0, HTime_1.createHTime)());
}
exports.isPast = isPast;
function isFuture(date) {
    return isAfter(date, (0, HTime_1.createHTime)());
}
exports.isFuture = isFuture;
function isSame(date, comparison, accuracy = 'milliseconds') {
    if (accuracy === 'milliseconds') {
        return date.epochMilliseconds === comparison.epochMilliseconds;
    }
    const props = COMPARISON_ACCURACY.slice(0, COMPARISON_ACCURACY.indexOf(accuracy));
    return props.every((prop) => date.global[prop] === comparison.global[prop]);
}
exports.isSame = isSame;
//# sourceMappingURL=Comparison.js.map