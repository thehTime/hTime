"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalClock = void 0;
const GlobalHour_1 = require("./GlobalHour");
function createLocalClock(hTime) {
    return (0, GlobalHour_1.getGlobalHours)(hTime.timeZone.offset);
}
exports.createLocalClock = createLocalClock;
//# sourceMappingURL=Clock.js.map