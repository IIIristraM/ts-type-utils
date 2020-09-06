import { Exact } from './exact';
import { GetOptionalKeys } from './optional';

export type ExtractByType<T, S> = Pick<
    T,
    NonNullable<
        {
            [K in keyof T]: K extends GetOptionalKeys<T>
                ? Exact<T[K], S | undefined> extends true
                    ? K
                    : never
                : Exact<T[K], S> extends true
                ? K
                : never;
        }[keyof T]
    >
>;
