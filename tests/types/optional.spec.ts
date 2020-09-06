import { exact } from '../asserts';
import { GetOptionalKeys, GetOptional, GetRequired, DeepPartial } from '../../lib/optional';

test('GetOptionalKeys<T>', () => {
    exact<GetOptionalKeys<{ a: number; b?: undefined; c?: {} }>, 'b' | 'c'>(true);
});

test('GetOptional<T>', () => {
    exact<GetOptional<{ a: undefined; b?: string; c?: undefined }>, { b?: string; c?: undefined }>(true);
});

test('GetRequired<T>', () => {
    exact<GetRequired<{ a: null; b?: string; c?: {} }>, { a: null }>(true);
});

test('DeepPartial<T>', () => {
    exact<
        DeepPartial<{
            s: {
                b: {
                    c: number;
                }[];
            };
        }>,
        {
            s?: {
                b?: {
                    c?: number;
                }[];
            };
        }
    >(true);
});
