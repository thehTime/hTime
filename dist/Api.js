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

function divide(dividend, divisor) {
    return dividend / divisor;
}
function divideAndFloor(dividend, divisor) {
    var quotient = divide(dividend, divisor);
    return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
}
function divideRemainder(dividend, divisor) {
    return dividend % divisor;
}

var MILLISECONDS_IN_SECOND = 1000;
var SECONDS_IN_MINUTE = 60;
var MINUTES_IN_HOUR = 60;
var HOURS_IN_DAY = 24;
var DAYS_IN_WEEK = 7;
var MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
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
function fromMillisecondsToMinutes(milliseconds) {
    return [
        divideAndFloor(milliseconds, MILLISECONDS_IN_MINUTE),
        divideRemainder(milliseconds, MILLISECONDS_IN_MINUTE)
    ];
}
function fromMinutesToHours(minutes) {
    return [
        divideAndFloor(minutes, MINUTES_IN_HOUR),
        divideRemainder(minutes, MINUTES_IN_HOUR)
    ];
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
function getGlobalHourFromHour(hour) {
    return GLOBAL_HOURS[hour];
}
function getHourFromGlobalHour(globalHour) {
    return GLOBAL_HOURS.indexOf(globalHour);
}
function getGlobalHours(offsetInMinutes) {
    if (offsetInMinutes === void 0) { offsetInMinutes = 0; }
    var hoursOffset = fromMinutesToHours(offsetInMinutes)[0];
    return __spreadArray(__spreadArray([], GLOBAL_HOURS.slice(-hoursOffset), true), GLOBAL_HOURS.slice(0, -hoursOffset), true);
}

function getOffsetInMinutes(timeZoneName, utcDate) {
    return fromMillisecondsToMinutes(dateFnsTz.getTimezoneOffset(timeZoneName, utcDate))[0];
}
function getOffsetInMinutesFromSystemDate(date) {
    return 0 - date.getTimezoneOffset();
}
function formatOffsetAsIsoString(offsetInMinutes) {
    var _a = fromMinutesToHours(offsetInMinutes).map(Math.abs), hoursOffset = _a[0], minutesOffset = _a[1];
    return [
        offsetInMinutes >= 0 ? '+' : '-',
        hoursOffset < 10 ? '0' : '',
        hoursOffset,
        minutesOffset < 10 ? '0' : '',
        minutesOffset,
    ].join('');
}

var REGEX_DATE_UTC_ISO = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?Z$/;
var REGEX_HOUR_UTC_ISO = /T([0-9]{2})/;
var REGEX_DATE_HTIME = /^([1-9][0-9]{0,3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T[abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]:([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?H$/;
var REGEX_HOUR_HTIME = /T([a-zA-Z]{1})/;
function isUtcIsoDateString(dateString) {
    return REGEX_DATE_UTC_ISO.test(dateString);
}
function isHTimeDateString(dateString) {
    return REGEX_DATE_HTIME.test(dateString);
}
function formatUtcIsoDateStringAsHTimeDateString(utcDateString) {
    var match = (utcDateString.match(REGEX_HOUR_UTC_ISO) || [])[0];
    var isoHour = match.slice(1);
    var globalHour = getGlobalHourFromHour(parseInt(isoHour));
    var _a = utcDateString.split(match), day = _a[0], time = _a[1];
    var formattedTime = time.replace(/Z$/, 'H');
    return "".concat(day, "T").concat(globalHour).concat(formattedTime);
}
function formatHTimeDateStringAsUtcIsoDateString(hTimeDateString) {
    var match = (hTimeDateString.match(REGEX_HOUR_HTIME) || [])[0];
    var globalHour = match.charAt(1);
    var localHour = getHourFromGlobalHour(globalHour);
    var _a = hTimeDateString.split(match), day = _a[0], time = _a[1];
    var formattedLocalHour = localHour < 10 ? "0".concat(localHour) : localHour;
    var formattedTime = time.replace(/H$/, 'Z');
    return "".concat(day, "T").concat(formattedLocalHour).concat(formattedTime);
}
function parseToUtcDate(dateString) {
    if (isUtcIsoDateString(dateString)) {
        return new Date(dateString);
    }
    if (isHTimeDateString(dateString)) {
        return new Date(formatHTimeDateStringAsUtcIsoDateString(dateString));
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
    return Object.freeze(__assign(__assign({}, createDateTime(date)), { hour: getGlobalHourFromHour(date.getUTCHours()) }));
}
function getLocalDateFromUtcDate(utcDate, timeZoneOffset) {
    return new Date(utcDate.valueOf() + fromMinutesToMilliseconds(timeZoneOffset));
}
function createHTime(options) {
    var _a = options || {}, dateString = _a.dateString, timeZone = _a.timeZone;
    var utcDate = dateString ? parseToUtcDate(dateString) : new Date;
    var timeZoneName = timeZone || formatOffsetAsIsoString(getOffsetInMinutesFromSystemDate(utcDate));
    var timeZoneOffset = getOffsetInMinutes(timeZoneName, utcDate);
    var localDate = getLocalDateFromUtcDate(utcDate, timeZoneOffset);
    return Object.freeze({
        utc: createDateTime(utcDate),
        local: createDateTime(localDate),
        global: createGlobalDateTime(utcDate),
        epochMilliseconds: utcDate.valueOf(),
        timeZone: {
            name: timeZoneName,
            offset: timeZoneOffset,
        },
        dateString: {
            utcIso: utcDate.toISOString(),
            hTime: formatUtcIsoDateStringAsHTimeDateString(utcDate.toISOString()),
        },
        toString: function () {
            return utcDate.toISOString();
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
function subMilliseconds(date, milliseconds) {
    return addMilliseconds(date, -milliseconds);
}
function subSeconds(date, seconds) {
    return addSeconds(date, -seconds);
}
function subMinutes(date, minutes) {
    return addMinutes(date, -minutes);
}
function subHours(date, hours) {
    return addHours(date, -hours);
}
function subDays(date, days) {
    return addDays(date, -days);
}
function subWeeks(date, weeks) {
    return addWeeks(date, -weeks);
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
exports.isPast = isPast;
exports.isSame = isSame;
exports.isUtcIsoDateString = isUtcIsoDateString;
exports.subDays = subDays;
exports.subHours = subHours;
exports.subMilliseconds = subMilliseconds;
exports.subMinutes = subMinutes;
exports.subSeconds = subSeconds;
exports.subWeeks = subWeeks;
//# sourceMappingURL=Api.js.map
