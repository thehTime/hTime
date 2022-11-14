"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromWeeksToMilliseconds = exports.fromDaysToMilliseconds = exports.fromHoursToMilliseconds = exports.fromMinutesToMilliseconds = exports.fromSecondsToMilliseconds = void 0;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
function fromSecondsToMilliseconds(seconds) {
    return seconds * MILLISECONDS_IN_SECOND;
}
exports.fromSecondsToMilliseconds = fromSecondsToMilliseconds;
function fromMinutesToMilliseconds(minutes) {
    return fromSecondsToMilliseconds(minutes * SECONDS_IN_MINUTE);
}
exports.fromMinutesToMilliseconds = fromMinutesToMilliseconds;
function fromHoursToMilliseconds(hours) {
    return fromMinutesToMilliseconds(hours * MINUTES_IN_HOUR);
}
exports.fromHoursToMilliseconds = fromHoursToMilliseconds;
function fromDaysToMilliseconds(days) {
    return fromHoursToMilliseconds(days * HOURS_IN_DAY);
}
exports.fromDaysToMilliseconds = fromDaysToMilliseconds;
function fromWeeksToMilliseconds(weeks) {
    return fromDaysToMilliseconds(weeks * DAYS_IN_WEEK);
}
exports.fromWeeksToMilliseconds = fromWeeksToMilliseconds;
//# sourceMappingURL=Conversion.js.map