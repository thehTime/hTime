"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOffsetAsIsoString = exports.getJustMinutesOffset = exports.getJustHoursOffset = exports.getOffsetInMinutesFromSystemDate = exports.getOffsetInMinutes = void 0;
const date_fns_tz_1 = require("date-fns-tz");
function getOffsetInMinutes(timeZoneName, UTCDate) {
    const offsetInMilliseconds = (0, date_fns_tz_1.getTimezoneOffset)(timeZoneName, UTCDate);
    return offsetInMilliseconds / (60 * 1000);
}
exports.getOffsetInMinutes = getOffsetInMinutes;
function getOffsetInMinutesFromSystemDate(date) {
    return 0 - date.getTimezoneOffset();
}
exports.getOffsetInMinutesFromSystemDate = getOffsetInMinutesFromSystemDate;
function getJustHoursOffset(offsetInMinutes) {
    const hoursOffset = offsetInMinutes / 60;
    return offsetInMinutes < 0 ? Math.ceil(hoursOffset) : Math.floor(hoursOffset);
}
exports.getJustHoursOffset = getJustHoursOffset;
function getJustMinutesOffset(offsetInMinutes) {
    return offsetInMinutes % 60;
}
exports.getJustMinutesOffset = getJustMinutesOffset;
function formatOffsetAsIsoString(offsetInMinutes) {
    const hoursOffset = Math.abs(getJustHoursOffset(offsetInMinutes));
    const minutesOffset = Math.abs(getJustMinutesOffset(offsetInMinutes));
    return [
        offsetInMinutes >= 0 ? '+' : '-',
        hoursOffset < 10 ? '0' : '',
        hoursOffset,
        minutesOffset < 10 ? '0' : '',
        minutesOffset,
    ].join('');
}
exports.formatOffsetAsIsoString = formatOffsetAsIsoString;
//# sourceMappingURL=Offset.js.map