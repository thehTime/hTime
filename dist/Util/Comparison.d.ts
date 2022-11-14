import { HTime } from '@/Core/HTime';
declare const COMPARISON_ACCURACY: readonly ["year", "month", "day", "hours", "minutes", "seconds", "milliseconds"];
declare type ComparisonAccuracy = typeof COMPARISON_ACCURACY[number];
export declare function isBefore(date: HTime, comparison: HTime): boolean;
export declare function isAfter(date: HTime, comparison: HTime): boolean;
export declare function isPast(date: HTime): boolean;
export declare function isFuture(date: HTime): boolean;
export declare function isSame(date: HTime, comparison: HTime, accuracy?: ComparisonAccuracy): boolean;
export {};
