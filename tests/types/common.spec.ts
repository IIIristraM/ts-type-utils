import { InstanceOf, TryOmit } from '../../lib/common';
import { exact } from '../asserts';

test('OmitUnsafe<T, K>', () => {
    exact<TryOmit<{ a: 1; b: 2 }, 'c'>, { a: 1; b: 2 }>(true);
    exact<TryOmit<{ a: 1; b: 2; c: 3 }, 'c'>, { a: 1; b: 2 }>(true);
});

test('InstanceOf<T>', () => {
    class Test {}

    exact<InstanceOf<typeof Test>, Test>(true);
    exact<InstanceOf<{}>, never>(true);
});
