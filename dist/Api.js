'use strict';

var dateFnsTz = require('date-fns-tz');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var MILLISECONDS_IN_SECOND = 1000;
var SECONDS_IN_MINUTE = 60;
var MINUTES_IN_HOUR = 60;
var HOURS_IN_DAY = 24;
var DAYS_IN_WEEK = 7;
function fromSecondsToMilliseconds(seconds) {
    return seconds * MILLISECONDS_IN_SECOND;
}
function fromMinutesToMilliseconds(minutes) {
    return fromSecondsToMilliseconds(minutes * SECONDS_IN_MINUTE);
}
function fromHoursToMilliseconds(hours) {
    return fromMinutesToMilliseconds(hours * MINUTES_IN_HOUR);
}
function fromDaysToMilliseconds(days) {
    return fromHoursToMilliseconds(days * HOURS_IN_DAY);
}
function fromWeeksToMilliseconds(weeks) {
    return fromDaysToMilliseconds(weeks * DAYS_IN_WEEK);
}

function getOffsetInMinutes(timeZoneName, UTCDate) {
    var offsetInMilliseconds = dateFnsTz.getTimezoneOffset(timeZoneName, UTCDate);
    return offsetInMilliseconds / (60 * 1000);
}
function getOffsetInMinutesFromSystemDate(date) {
    return 0 - date.getTimezoneOffset();
}
function getJustHoursOffset(offsetInMinutes) {
    var hoursOffset = offsetInMinutes / 60;
    return offsetInMinutes < 0 ? Math.ceil(hoursOffset) : Math.floor(hoursOffset);
}
function getJustMinutesOffset(offsetInMinutes) {
    return offsetInMinutes % 60;
}
function formatOffsetAsIsoString(offsetInMinutes) {
    var hoursOffset = Math.abs(getJustHoursOffset(offsetInMinutes));
    var minutesOffset = Math.abs(getJustMinutesOffset(offsetInMinutes));
    return [
        offsetInMinutes >= 0 ? '+' : '-',
        hoursOffset < 10 ? '0' : '',
        hoursOffset,
        minutesOffset < 10 ? '0' : '',
        minutesOffset,
    ].join('');
}

var GLOBAL_HOURS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];
function getGlobalHourFromUTCHour(hour) {
    return GLOBAL_HOURS[hour];
}
function getUTCHourFromGlobalHour(globalHour) {
    return GLOBAL_HOURS.indexOf(globalHour);
}
function getGlobalHours(offsetInMinutes) {
    if (offsetInMinutes === void 0) { offsetInMinutes = 0; }
    var hoursOffset = getJustHoursOffset(offsetInMinutes);
    return __spreadArray(__spreadArray([], GLOBAL_HOURS.slice(-hoursOffset), true), GLOBAL_HOURS.slice(0, -hoursOffset), true);
}

var REGEX_DATE_ISO_UTC = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/;
var REGEX_HOUR_ISO_UTC = /T([0-9]{2})/;
var REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/;
var REGEX_HOUR_HTIME = /T([a-zA-Z]{1})/;
function isIsoUTCDateString(dateString) {
    return REGEX_DATE_ISO_UTC.test(dateString);
}
function isHTimeDateString(dateString) {
    return REGEX_DATE_HTIME.test(dateString);
}
function formatIsoUTCDateStringAsHTimeDateString(isoDateString) {
    var match = (isoDateString.match(REGEX_HOUR_ISO_UTC) || [])[0];
    var isoHour = match.slice(1);
    var globalHour = getGlobalHourFromUTCHour(parseInt(isoHour));
    var _a = isoDateString.split(match), day = _a[0], time = _a[1];
    var formattedTime = time.replace(/Z$/, 'H');
    return "".concat(day, "T").concat(globalHour).concat(formattedTime);
}
function formatHTimeDateStringAsIsoUTCDateString(hTimeDateString) {
    var match = (hTimeDateString.match(REGEX_HOUR_HTIME) || [])[0];
    var globalHour = match.charAt(1);
    var localHour = getUTCHourFromGlobalHour(globalHour);
    var _a = hTimeDateString.split(match), day = _a[0], time = _a[1];
    var formattedLocalHour = localHour < 10 ? "0".concat(localHour) : localHour;
    var formattedTime = time.replace(/H$/, 'Z');
    return "".concat(day, "T").concat(formattedLocalHour).concat(formattedTime);
}
function parseToUTCDate(dateString) {
    if (isIsoUTCDateString(dateString)) {
        return dateFnsTz.toDate(dateString);
    }
    if (isHTimeDateString(dateString)) {
        return parseToUTCDate(formatHTimeDateStringAsIsoUTCDateString(dateString));
    }
    throw new Error("\"".concat(dateString, "\" is an invalid date"));
}

function createDateTime(date) {
    return Object.freeze({
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes(),
        second: date.getUTCSeconds(),
        millisecond: date.getUTCMilliseconds(),
    });
}
function createGlobalDateTime(date) {
    return Object.freeze(__assign(__assign({}, createDateTime(date)), { hour: getGlobalHourFromUTCHour(date.getUTCHours()) }));
}
function getLocalDateFromUTCDate(UTCDate, timeZoneOffset) {
    return new Date(UTCDate.valueOf() + fromMinutesToMilliseconds(timeZoneOffset));
}
function createHTime(options) {
    var _a = options || {}, dateString = _a.dateString, timeZone = _a.timeZone;
    var UTCDate = dateString ? parseToUTCDate(dateString) : new Date;
    var timeZoneName = timeZone || formatOffsetAsIsoString(getOffsetInMinutesFromSystemDate(UTCDate));
    var timeZoneOffset = getOffsetInMinutes(timeZoneName, UTCDate);
    var localDate = getLocalDateFromUTCDate(UTCDate, timeZoneOffset);
    return Object.freeze({
        utc: createDateTime(UTCDate),
        local: createDateTime(localDate),
        global: createGlobalDateTime(UTCDate),
        epochMilliseconds: UTCDate.valueOf(),
        timeZone: {
            name: timeZoneName,
            offset: timeZoneOffset,
        },
        dateString: {
            UTCIso: UTCDate.toISOString(),
            hTime: formatIsoUTCDateStringAsHTimeDateString(UTCDate.toISOString()),
        },
        toString: function () {
            return UTCDate.toISOString();
        },
    });
}

function createClock(hTime) {
    return getGlobalHours(hTime.timeZone.offset);
}

var COMPARISON_ACCURACY = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
];
function isBefore(date, comparison) {
    return date.epochMilliseconds < comparison.epochMilliseconds;
}
function isAfter(date, comparison) {
    return date.epochMilliseconds > comparison.epochMilliseconds;
}
function isPast(date) {
    return isBefore(date, createHTime());
}
function isFuture(date) {
    return isAfter(date, createHTime());
}
function isSame(date, comparison, accuracy) {
    if (accuracy === void 0) { accuracy = 'millisecond'; }
    if (accuracy === 'millisecond') {
        return date.epochMilliseconds === comparison.epochMilliseconds;
    }
    var props = COMPARISON_ACCURACY.slice(0, COMPARISON_ACCURACY.indexOf(accuracy));
    return props.every(function (prop) { return date.global[prop] === comparison.global[prop]; });
}

function addMilliseconds(date, milliseconds) {
    if (milliseconds === 0) {
        return date;
    }
    return createHTime({
        dateString: new Date(date.epochMilliseconds + milliseconds).toISOString(),
        timeZone: date.timeZone.name,
    });
}
function addSeconds(date, seconds) {
    return addMilliseconds(date, fromSecondsToMilliseconds(seconds));
}
function addMinutes(date, minutes) {
    return addMilliseconds(date, fromMinutesToMilliseconds(minutes));
}
function addHours(date, hours) {
    return addMilliseconds(date, fromHoursToMilliseconds(hours));
}
function addDays(date, days) {
    return addMilliseconds(date, fromDaysToMilliseconds(days));
}
function addWeeks(date, weeks) {
    return addMilliseconds(date, fromWeeksToMilliseconds(weeks));
}

exports.addDays = addDays;
exports.addHours = addHours;
exports.addMilliseconds = addMilliseconds;
exports.addMinutes = addMinutes;
exports.addSeconds = addSeconds;
exports.addWeeks = addWeeks;
exports.createClock = createClock;
exports.createHTime = createHTime;
exports.isAfter = isAfter;
exports.isBefore = isBefore;
exports.isFuture = isFuture;
exports.isHTimeDateString = isHTimeDateString;
exports.isIsoUTCDateString = isIsoUTCDateString;
exports.isPast = isPast;
exports.isSame = isSame;
//# sourceMappingURL=Api.js.map
