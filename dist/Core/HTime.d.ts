import { GlobalHour } from './GlobalHour';
interface DateTime<H = number> {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hours: H;
    readonly minutes: number;
    readonly seconds: number;
    readonly milliseconds: number;
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
        readonly UTCIso: string;
        readonly hTime: string;
    };
}
export declare function getLocalDateFromUTCDate(UTCDate: Date, timeZoneOffset: number): Date;
export declare function createHTime(options?: HTimeInstanceOptions): HTime;
export {};
