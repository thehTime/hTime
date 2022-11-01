"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHTime = exports.getLocalDateFromUTCDate = void 0;
const date_fns_1 = require("date-fns");
const GlobalHour_1 = require("./GlobalHour");
const Offset_1 = require("./Offset");
const Parser_1 = require("./Parser");
function createDateTime(date) {
    return Object.freeze({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
    });
}
function createGlobalDateTime(date) {
    return Object.freeze(Object.assign(Object.assign({}, createDateTime(date)), { hours: (0, GlobalHour_1.getGlobalHourFromUTCHour)(date.getUTCHours()) }));
}
function getLocalDateFromUTCDate(UTCDate, timeZoneOffset) {
    return (0, date_fns_1.addMinutes)(UTCDate, timeZoneOffset);
}
exports.getLocalDateFromUTCDate = getLocalDateFromUTCDate;
function createHTime(options) {
    const { dateString, timeZone } = options || {};
    const UTCDate = dateString ? (0, Parser_1.parseToUTCDate)(dateString) : new Date;
    const timeZoneName = timeZone || (0, Offset_1.formatOffsetAsIsoString)((0, Offset_1.getOffsetInMinutesFromSystemDate)(UTCDate));
    const timeZoneOffset = (0, Offset_1.getOffsetInMinutes)(timeZoneName, UTCDate);
    const localDate = getLocalDateFromUTCDate(UTCDate, timeZoneOffset);
    return Object.freeze({
        utc: createDateTime(UTCDate),
        local: createDateTime(localDate),
        global: createGlobalDateTime(UTCDate),
        timeZone: {
            name: timeZoneName,
            offset: timeZoneOffset,
        },
        dateString: {
            UTCIso: UTCDate.toISOString(),
            hTime: (0, Parser_1.formatIsoUTCDateStringAsHTimeDateString)(UTCDate.toISOString()),
        },
        toString() {
            return UTCDate.toISOString();
        },
    });
}
exports.createHTime = createHTime;
//# sourceMappingURL=HTime.js.map