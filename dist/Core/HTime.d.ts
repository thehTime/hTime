import { GlobalHour } from './GlobalHour';
interface DateTime<H = number> {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: H;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
}
export interface HTimeInstanceOptions {
    dateString?: string;
    timeZone?: string;
}
export interface HTime {
    readonly utc: Readonly<DateTime>;
    readonly local: Readonly<DateTime>;
    readonly global: Readonly<DateTime<GlobalHour>>;
    readonly epochMilliseconds: number;
    readonly timeZone: {
        readonly name: string;
        readonly offset: number;
    };
    readonly dateString: {
        readonly utcIso: string;
        readonly hTime: string;
    };
}
export declare function getLocalDateFromUtcDate(utcDate: Date, timeZoneOffset: number): Date;
export declare function createHTime(options?: HTimeInstanceOptions): HTime;
export {};
