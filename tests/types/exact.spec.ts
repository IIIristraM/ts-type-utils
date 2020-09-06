import { exact } from '../asserts';
import { Indexed } from '../../lib/common';

interface NotEmptyObj {
    x: 1;
}

test('Exact<T>', () => {
    exact<unknown, unknown>(true);
    exact<number, number | string>(false);
    exact<number, number & string>(false);
    exact<number, number | {}>(false);
    exact<number, never>(false);
    exact<number, unknown>(false);
    exact<number, null>(false);
    exact<number, any>(false);

    exact<any, any>(true);
    exact<any, any | string>(true);
    exact<any, any & string>(true);
    exact<any, any | {}>(true);
    exact<any, never>(false);
    exact<any, unknown>(false);
    exact<any, null>(false);
    exact<any, undefined>(false);

    exact<undefined, null>(false);
    exact<undefined, never>(false);
    exact<undefined, unknown>(false);
    exact<undefined, undefined>(true);

    exact<never, never>(true);
    exact<never, never & string>(true);
    exact<never, never | string>(false);
    exact<never, never | {}>(false);
    exact<never, unknown>(false);
    exact<never, null>(false);

    exact<unknown, unknown>(true);
    exact<unknown, unknown | string>(true);
    exact<unknown, unknown | {}>(true);
    exact<unknown, unknown & string>(false);
    exact<unknown, never>(false);
    exact<unknown, null>(false);
    exact<unknown, any>(false);

    exact<object, object>(true);
    exact<object, object | NotEmptyObj>(true);
    exact<object, object | Indexed>(true);
    exact<object, object & Indexed>(false);
    exact<object, object & NotEmptyObj>(false);
    exact<object, NotEmptyObj>(false);
    exact<object, object | string>(false);
    exact<object, object & string>(false);
    exact<object, never>(false);
    exact<object, null>(false);
    exact<object, any>(false);
    exact<object, unknown>(false);

    exact<Indexed, Indexed>(true);
    exact<Indexed, Indexed | Indexed>(true);
    exact<Indexed, Indexed & Indexed>(true);
    exact<Indexed<string>, Indexed>(false);
    exact<Indexed, Indexed | NotEmptyObj>(false);
    exact<Indexed, Indexed & NotEmptyObj>(false);
    exact<Indexed, NotEmptyObj>(false);
    exact<Indexed, Indexed | string>(false);
    exact<Indexed, Indexed & string>(false);
    exact<Indexed, never>(false);
    exact<Indexed, null>(false);
    exact<Indexed, any>(false);
    exact<Indexed, unknown>(false);
    exact<Indexed<string>, Indexed<number>>(false);

    exact<{ x: 1 }, { x?: 1 }>(false);
    exact<{ x: 1 }, { x?: unknown }>(false);
    exact<{ x: 1 }, { x?: never }>(false);
    exact<{ x: 1 }, { x: any }>(false);

    exact<{ x: undefined }, { x: undefined }>(true);
    exact<{ x?: undefined }, { x?: undefined }>(true);
    exact<{ x: undefined }, { x?: undefined }>(false);

    exact<{ x: null }, { x: null }>(true);
    exact<{ x?: null }, { x?: null }>(true);
    exact<{ x: null }, { x?: null }>(false);

    // TODO should be false
    exact<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z: 1 }>; a?: number } }>(true);

    exact<{ x: { y: Array<{ z: 1 }>; a?: string } }, { x: { y: Array<{ z: 1 }>; a?: number } }>(false);
    exact<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z: 1 }> } }>(true);
    exact<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z?: 1 }> } }>(false);
    exact<{ x: { y: Array<{ z: 1 }> } }, { x: { y?: Array<{ z: 1 }> } }>(false);

    exact<(a: number, b: string) => void, (a: number, b: string) => number>(false);
    exact<(a: number, b: string) => void, (a: number, b: string) => void>(true);

    exact<(a: number, b: string) => any, (a: number, b: string) => number>(false);

    // TODO should be false
    exact<(a: number, b: number) => any, (a: number, b: string) => any>(true);
    exact<(a: number, b?: string) => any, (a: number, b: string) => any>(true);
});
