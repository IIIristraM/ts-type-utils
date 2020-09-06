import { exact } from '../asserts';
import { IsTuple } from '../../lib/is-tuple';

test('IsTuple<T>', () => {
    exact<IsTuple<[any]>, true>(true);
    exact<IsTuple<any[]>, false>(true);
});
