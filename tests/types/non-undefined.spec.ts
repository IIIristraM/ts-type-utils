import { NonUndefined } from '../../lib/non-undefined';
import { exact } from '../asserts';

test('NonUndefined<T>', () => {
    exact<NonUndefined<number | undefined>, number>(true);
    exact<NonUndefined<number>, number>(true);
    exact<NonUndefined<number>, NonUndefined<number>>(true);
    exact<NonUndefined<NonUndefined<number>>, number>(true);

    exact<NonUndefined<null | undefined>, null>(true);
    exact<NonUndefined<unknown | undefined>, unknown>(true);
    exact<NonUndefined<{} | undefined>, {}>(true);

    exact<NonUndefined<undefined>, undefined>(true);
    exact<NonUndefined<never | undefined>, undefined>(true);
});
