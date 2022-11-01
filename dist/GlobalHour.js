"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalHours = exports.getUTCHourFromGlobalHour = exports.getGlobalHourFromUTCHour = void 0;
const Offset_1 = require("./Offset");
const GLOBAL_HOURS = [
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
exports.getGlobalHourFromUTCHour = getGlobalHourFromUTCHour;
function getUTCHourFromGlobalHour(globalHour) {
    return GLOBAL_HOURS.indexOf(globalHour);
}
exports.getUTCHourFromGlobalHour = getUTCHourFromGlobalHour;
function getGlobalHours(offsetInMinutes = 0) {
    const hoursOffset = (0, Offset_1.getJustHoursOffset)(offsetInMinutes);
    return [
        ...GLOBAL_HOURS.slice(-hoursOffset),
        ...GLOBAL_HOURS.slice(0, -hoursOffset),
    ];
}
exports.getGlobalHours = getGlobalHours;
//# sourceMappingURL=GlobalHour.js.map