import { Exact } from './exact';

export type NonUndefined<T> = Exclude<T, undefined> extends infer U
    ? [U] extends [never]
        ? Exact<T | undefined, null> extends true
            ? null
            : undefined
        : U
    : never;
