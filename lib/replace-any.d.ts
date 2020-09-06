import { ReplaceReturn } from './functions';
import { IsAny } from './is-any';
import { IsObject } from './is-object';

export type ReplaceAnyArgs<T extends Function, R> = T extends (...args: Array<infer U>) => any
    ? true extends IsAny<U>
        ? (...args: R[]) => ReturnType<T>
        : T
    : never;

export type ReplaceAnyReturn<T extends Function, R> = T extends (...args: any[]) => infer U
    ? true extends IsAny<U>
        ? ReplaceReturn<U, R>
        : T
    : never;

export type ReplaceAny<T, R> = true extends IsAny<T>
    ? R
    : true extends IsObject<T>
    ? {
          [K in keyof T]: ReplaceAny<T[K], R>;
      }
    : T extends Array<infer U>
    ? Array<U> extends T
        ? Array<ReplaceAny<U, R>>
        : T
    : T extends Function
    ? ReplaceAnyArgs<ReplaceAnyReturn<T, R>, R>
    : T;
