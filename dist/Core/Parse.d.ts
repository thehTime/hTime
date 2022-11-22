declare type DateStringType = 'Z' | 'H';
declare type DateStringParts = [string, string, string, string, string, string, string | undefined, string | undefined];
export declare function isUtcIsoDateString(dateString: string): boolean;
export declare function isHTimeDateString(dateString: string): boolean;
export declare function createDateString(type: DateStringType, year: string | number, month: string | number, day: string | number, hour: string | number, minute: string | number, second: string | number | undefined, millisecond: string | number | undefined): string;
export declare function breakdownDateString(dateString: string): DateStringParts;
export declare function formatUtcIsoDateStringAsHTimeDateString(utcDateString: string): string;
export declare function formatHTimeDateStringAsUtcIsoDateString(hTimeDateString: string): string;
export declare function parseToUtcDate(dateString: string): Date;
export {};
