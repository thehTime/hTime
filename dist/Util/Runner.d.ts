import { HTime } from '../Core/HTime';
export declare type Runner = () => HTime;
export declare function createRunner(hTime?: HTime): Runner;
