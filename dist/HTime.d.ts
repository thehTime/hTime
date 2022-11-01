import { GlobalHour } from './GlobalHour';
interface DateTime<H> {
    readonly year: Readonly<number>;
    readonly month: Readonly<number>;
    readonly day: Readonly<number>;
    readonly hours: Readonly<H>;
    readonly minutes: Readonly<number>;
    readonly seconds: Readonly<number>;
    readonly milliseconds: Readonly<number>;
}
export interface HTimeInstanceOptions {
    dateString?: string;
    timeZone?: string;
}
export interface HTime {
    readonly utc: Readonly<DateTime<number>>;
    readonly local: Readonly<DateTime<number>>;
    readonly global: Readonly<DateTime<GlobalHour>>;
    readonly timeZone: {
        name: Readonly<string>;
        offset: Readonly<number>;
    };
    readonly dateString: {
        UTCIso: Readonly<string>;
        hTime: Readonly<string>;
    };
}
export declare function getLocalDateFromUTCDate(UTCDate: Date, timeZoneOffset: number): Date;
export declare function createHTime(options?: HTimeInstanceOptions): HTime;
export {};
