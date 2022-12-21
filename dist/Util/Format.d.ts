import { HTime } from '../Core/HTime';
interface FormatOptions {
    useLocal?: boolean;
}
export declare function format(date: HTime, template: string, options?: FormatOptions): string;
export {};
