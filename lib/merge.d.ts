import { IsAny } from './is-any';
import { IsObject } from './is-object';
import { Exact } from './exact';
import { KnownKeys } from './known';
import { NonUndefined } from './non-undefined';

export type Merge<T1, T2> = {
    [K in keyof T2]: K extends keyof (T2 | T1)
        ? NonUndefined<T2[K]> extends infer T2K
            ? NonUndefined<T1[K]> extends infer T1K
                ? // rewrite any
                  true extends IsAny<T2K> | IsAny<T1K>
                    ? T2K
                    : T1K extends (infer U)[]
                    ? // merge array items only if both item's types are object-like
                      T2K extends (infer W)[]
                        ? true extends IsAny<U> | IsAny<W>
                            ? T2K
                            : false extends IsObject<U> | IsObject<W>
                            ? T2K
                            : // : Exact<W, Merge<T1, T2>> extends true // type A = Assign<B, {prop: A[]}>
                              // ? Array<W>
                              Array<Merge<U, W>> // merge items
                        : T2K
                    : false extends IsObject<T1K> | IsObject<T2K>
                    ? T2K
                    : // : Exact<T2K, Merge<T1, T2>> extends true // type A = Assign<B, {prop: A}>
                      // ? T2K
                      Merge<T1K, T2K> // merge objects
                : never
            : never
        : T2[K];
} &
    // handle non-indexed part from T1
    (KnownKeys<T1> extends infer K
        ? [K] extends [never]
            ? unknown
            : Exclude<K, keyof T2> extends infer U
            ? [U] extends [never]
                ? unknown
                : Exact<U, K> extends true
                ? T1
                : Pick<T1, U extends keyof T1 ? U : never>
            : never
        : never) &
    // handle indexed part from T1
    (Exclude<keyof T1, keyof T2> extends infer U
        ? string extends U
            ? Pick<T1, Exclude<keyof T1, KnownKeys<T1>>>
            : unknown
        : never);
