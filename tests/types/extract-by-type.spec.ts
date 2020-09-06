import { ExtractByType } from '../../lib/extract-by-type';
import { Indexed } from '../../lib/common';
import { exact } from '../asserts';

test('ExtractByType<T, S>', () => {
    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f: undefined;
                g?: number;
            },
            number
        >,
        {
            b: number;
            g?: number;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f: undefined;
            },
            any
        >,
        {
            a: any;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c?: unknown;
                d: never;
                e: null;
                f: undefined;
            },
            unknown
        >,
        {
            c?: unknown;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f: undefined;
            },
            never
        >,
        {
            d: never;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f: undefined;
            },
            null
        >,
        {
            e: null;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e?: null;
                f: undefined;
            },
            null
        >,
        {
            e?: null;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f: undefined;
            },
            undefined
        >,
        {
            f: undefined;
        }
    >(true);

    type A = ExtractByType<
        {
            a: any;
            b: number;
            c?: unknown;
            d: never;
            e: null;
            f: undefined;
        },
        unknown
    >;

    exact<
        ExtractByType<
            {
                a: any;
                b: number;
                c: unknown;
                d: never;
                e: null;
                f?: undefined;
            },
            undefined
        >,
        {
            f?: undefined;
        }
    >(true);

    exact<
        ExtractByType<
            {
                a: Indexed<number>;
                b: Indexed<string>;
                c: {
                    x: number;
                };
            },
            Indexed<number>
        >,
        {
            a: Indexed<number>;
        }
    >(true);
});
