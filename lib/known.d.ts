import { NonObj } from './is-object';

export type KnownKeys<T> = keyof PickKnown<T>;

export type PickKnown<T> = [T] extends [never]
    ? {}
    : T extends NonObj
    ? {}
    : {
          [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
      };
