"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWeeks = exports.addDays = exports.addHours = exports.addMinutes = exports.addSeconds = exports.addMilliseconds = void 0;
const HTime_1 = require("@/Core/HTime");
const Conversion_1 = require("@/Util/Conversion");
function addMilliseconds(date, milliseconds) {
    if (milliseconds === 0) {
        return date;
    }
    return (0, HTime_1.createHTime)({
        dateString: new Date(date.epochMilliseconds + milliseconds).toISOString(),
        timeZone: date.timeZone.name,
    });
}
exports.addMilliseconds = addMilliseconds;
function addSeconds(date, seconds) {
    return addMilliseconds(date, (0, Conversion_1.fromSecondsToMilliseconds)(seconds));
}
exports.addSeconds = addSeconds;
function addMinutes(date, minutes) {
    return addMilliseconds(date, (0, Conversion_1.fromMinutesToMilliseconds)(minutes));
}
exports.addMinutes = addMinutes;
function addHours(date, hours) {
    return addMilliseconds(date, (0, Conversion_1.fromHoursToMilliseconds)(hours));
}
exports.addHours = addHours;
function addDays(date, days) {
    return addMilliseconds(date, (0, Conversion_1.fromDaysToMilliseconds)(days));
}
exports.addDays = addDays;
function addWeeks(date, weeks) {
    return addMilliseconds(date, (0, Conversion_1.fromWeeksToMilliseconds)(weeks));
}
exports.addWeeks = addWeeks;
//# sourceMappingURL=Operation.js.map