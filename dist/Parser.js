"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToUTCDate = exports.formatHTimeDateStringAsIsoUTCDateString = exports.formatIsoUTCDateStringAsHTimeDateString = exports.isHTimeDateString = exports.isIsoUTCDateString = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const GlobalHour_1 = require("./GlobalHour");
const REGEX_DATE_ISO_UTC = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/;
const REGEX_HOUR_ISO_UTC = /T([0-9]{2})/;
const REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/;
const REGEX_HOUR_HTIME = /T([a-zA-Z]{1})/;
function isIsoUTCDateString(dateString) {
    return REGEX_DATE_ISO_UTC.test(dateString);
}
exports.isIsoUTCDateString = isIsoUTCDateString;
function isHTimeDateString(dateString) {
    return REGEX_DATE_HTIME.test(dateString);
}
exports.isHTimeDateString = isHTimeDateString;
function formatIsoUTCDateStringAsHTimeDateString(isoDateString) {
    const [match] = (isoDateString.match(REGEX_HOUR_ISO_UTC) || []);
    const isoHour = match.slice(1);
    const globalHour = (0, GlobalHour_1.getGlobalHourFromUTCHour)(parseInt(isoHour));
    const [day, time] = isoDateString.split(match);
    const formattedTime = time.replace(/Z$/, 'H');
    return `${day}T${globalHour}${formattedTime}`;
}
exports.formatIsoUTCDateStringAsHTimeDateString = formatIsoUTCDateStringAsHTimeDateString;
function formatHTimeDateStringAsIsoUTCDateString(hTimeDateString) {
    const [match] = (hTimeDateString.match(REGEX_HOUR_HTIME) || []);
    const globalHour = match.charAt(1);
    const localHour = (0, GlobalHour_1.getUTCHourFromGlobalHour)(globalHour);
    const [day, time] = hTimeDateString.split(match);
    const formattedLocalHour = localHour < 10 ? `0${localHour}` : localHour;
    const formattedTime = time.replace(/H$/, 'Z');
    return `${day}T${formattedLocalHour}${formattedTime}`;
}
exports.formatHTimeDateStringAsIsoUTCDateString = formatHTimeDateStringAsIsoUTCDateString;
function parseToUTCDate(dateString) {
    if (isIsoUTCDateString(dateString)) {
        return (0, date_fns_tz_1.toDate)(dateString);
    }
    if (isHTimeDateString(dateString)) {
        return parseToUTCDate(formatHTimeDateStringAsIsoUTCDateString(dateString));
    }
    throw new Error(`"${dateString}" is an invalid date`);
}
exports.parseToUTCDate = parseToUTCDate;
//# sourceMappingURL=Parser.js.map