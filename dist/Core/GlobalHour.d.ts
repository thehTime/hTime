declare const GLOBAL_HOURS: readonly ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
export declare type GlobalHour = typeof GLOBAL_HOURS[number];
export declare function getGlobalHourFromHour(hour: number): GlobalHour;
export declare function getHourFromGlobalHour(globalHour: GlobalHour): number;
export declare function getGlobalHours(offsetInMinutes?: number): GlobalHour[];
export declare function isPreviousGlobalHour(targetHour: GlobalHour, comparisonHour: GlobalHour): boolean;
export declare function isNextGlobalHour(targetHour: GlobalHour, comparisonHour: GlobalHour): boolean;
export {};
