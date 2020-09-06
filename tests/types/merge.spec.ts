import { Merge } from '../../lib/merge';
import { Indexed } from '../../lib/common';
import { IsAny } from '../../lib/is-any';
import { NonUndefined } from '../../lib/non-undefined';
import { exact } from '../asserts';

test('Merge<T1, T2>', () => {
    // final type has uniq keys from both parameters
    exact<
        Merge<{ a: string; c?: string }, { b?: undefined }>,
        {
            a: string;
            c?: string;
            b?: undefined;
        }
    >(true);

    exact<
        Merge<
            { x: { a?: undefined; b: number; c?: undefined; d: string }[] },
            { x: { a: number; b?: undefined; c?: null; d?: number }[] }
        >,
        {
            x: {
                a: number;
                b?: undefined;
                c?: null;
                d?: number;
            }[];
        }
    >(true);

    exact<
        Merge<{ a: string; c?: string }, { b?: string }>,
        {
            a: string;
            c: string;
            b?: string;
        }
    >(false);

    exact<
        Merge<{ a: string; c?: string }, { b?: string }>,
        {
            a: string;
            c: string;
            b: string;
        }
    >(false);

    // requirement of same keys is taken from the second parameter
    exact<
        Merge<{ a: string; b?: number }, { a?: string; b: number }>,
        {
            a?: string;
            b: number;
        }
    >(true);

    exact<
        Merge<{ a: string; b?: number }, { a?: string; b: number }>,
        {
            a: string;
            b: number;
        }
    >(false);

    exact<
        Merge<{ a: string; b?: number }, { a?: string; b: number }>,
        {
            a?: string;
            b?: number;
        }
    >(false);

    exact<
        Merge<
            {
                a: number | string | boolean | Function | null | undefined;
                b: { x: number };
                c: boolean;
                d: { x: 1 };
                f: any;
                z: Array<{ a: 1 }>;
            },
            {
                a: number;
                b: { y: string } | string;
                c: boolean[];
                d: any;
                f: { x: 1 };
                z: Array<Array<{ b: 1 }>>;
            }
        >,
        {
            a: number;
            b: { y: string } | string;
            c: boolean[];
            d: any;
            f: { x: 1 };
            z: Array<Array<{ b: 1 }>>;
        }
    >(true);

    // object type recursively merged
    exact<
        Merge<
            {
                a: {
                    b: string;
                    c: any[];
                };
                b: number;
            },
            {
                a: {
                    b?: number;
                    c: boolean;
                    d: {};
                };
            }
        >,
        {
            a: {
                b?: number;
                c: boolean;
                d: {};
            };
            b: number;
        }
    >(true);

    // array items recursively merged if they are objects
    exact<
        Merge<
            {
                a: {
                    b: {
                        a: any[];
                        x: number;
                    };
                    c: any[];
                }[];
                b: number;
            },
            {
                a: {
                    b?: {
                        x?: string;
                    };
                    c: boolean;
                    d: {};
                }[];
            }
        >,
        {
            a: {
                b?: {
                    a: any[];
                    x?: string;
                };
                c: boolean;
                d: {};
            }[];
            b: number;
        }
    >(true);

    // indexed types recursively merged
    exact<
        Merge<
            {
                [key: string]: {
                    b: string;
                    c: any[];
                };
            },
            {
                [key: string]: {
                    b?: number;
                    c: boolean;
                    d: {};
                };
            }
        >,
        {
            [key: string]: {
                b?: number;
                c: boolean;
                d: {};
            };
        }
    >(true);

    // intersections are merged
    exact<
        Merge<{ a: string } & { b: { x: number } }, { c: boolean; b: { x: string; y: number } } & { a: number }>,
        {
            a: number;
            c: boolean;
            b: { x: string; y: number };
        }
    >(true);

    // union of T2 replace T1
    exact<
        Merge<{ b: string } | { b: { x: number; c: boolean } }, { b: { x: string; y: number } } | { b: number }>,
        { b: { x: string; y: number } } | { b: number }
    >(true);

    type RewriteWithAny = Merge<{ a: Array<{ x: 1 }> }, { a: any }>;
    exact<IsAny<RewriteWithAny['a']>, true>(true);

    type RewriteAny = Merge<{ a: any }, { a: Array<{ x: 1 }> }>;
    exact<IsAny<RewriteAny['a']>, false>(true);
    exact<
        RewriteAny,
        {
            a: Array<{ x: 1 }>;
        }
    >(true);

    type RewriteIndexedAny = Merge<Indexed<string>, { a: Array<{ x: 1 }> }>;
    exact<IsAny<RewriteIndexedAny['a']>, false>(true);
    exact<
        RewriteIndexedAny,
        Indexed<string> & {
            a: Array<{ x: 1 }>;
        }
    >(true);
    exact<
        RewriteIndexedAny,
        Indexed<number> & {
            a: Array<{ x: 1 }>;
        }
    >(false);

    type RewriteUnion = Merge<{ a: string | { x: 1 } }, { a: { b: 1 } }>;
    exact<
        RewriteUnion,
        {
            a: { b: 1 };
        }
    >(true);

    type RewriteIndexedUnion = Merge<Indexed<{ x: any }> & { a: string; b: string }, { a?: number }>;
    exact<NonUndefined<number>, number>(true);
    exact<
        RewriteIndexedUnion,
        Indexed<{ x: any }> & {
            b: string;
            a?: number;
        }
    >(true);

    type RewriteIndexed = Merge<Indexed<{ x: string; y: number }>, Indexed<{ x?: number; z: boolean }>>;
    exact<
        RewriteIndexed,
        Indexed<{
            x?: number;
            y: number;
            z: boolean;
        }>
    >(true);

    type TestType = { x: string; y: TestType };
    type OverwriteTestType = Merge<
        TestType,
        {
            x?: number;
            y?: OverwriteTestType;
            z: { a: 1 }[];
        }
    >;
    exact<
        OverwriteTestType,
        {
            x?: number;
            y?: OverwriteTestType;
            z: { a: 1 }[];
        }
    >(true);

    interface TestType2 {
        x: string;
        y?: TestType2[];
    }
    type OverwriteTestType2 = Merge<
        TestType2,
        {
            x?: number;
            y?: OverwriteTestType2[];
            z?: boolean;
        }
    >;
    exact<
        OverwriteTestType2,
        {
            x?: number;
            y?: OverwriteTestType2[];
            z?: boolean;
        }
    >(true);

    exact<
        Merge<
            {
                a: string;
                b: { c: Array<{ d: number; d2: boolean }> };
                [x: number]: { e?: any };
            },
            {
                b: { c: Array<{ d?: string }>; c2: number };
                [x: number]: { e: boolean };
                f: null;
            }
        >,
        {
            a: string;
            b: { c: Array<{ d?: string; d2: boolean }>; c2: number };
            [x: number]: { e: boolean };
            f: null;
        }
    >(true);
});

test('Merge<T1, T2> - nested', () => {
    type T1 = { value: T1 };
    type T2 = { default?: T1 };

    type T3 = Merge<
        T1,
        {
            value: T3;
        }
    >;

    type T4 = Merge<
        T2,
        {
            default?: T3;
        }
    >;

    exact<
        T4,
        {
            default?: {
                value: T1;
            };
        }
    >(true);
});
