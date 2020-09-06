import { exact } from '../asserts';
import { IsAny } from '../../lib/is-any';

test('IsAny<T>', () => {
    // negative cases
    exact<IsAny<number>, false>(true);
    exact<IsAny<number>, true>(false);

    exact<IsAny<boolean>, false>(true);
    exact<IsAny<boolean>, true>(false);

    exact<IsAny<any[]>, false>(true);
    exact<IsAny<any[]>, true>(false);

    exact<IsAny<object>, false>(true);
    exact<IsAny<object>, true>(false);

    exact<IsAny<{}>, false>(true);
    exact<IsAny<{}>, true>(false);

    exact<IsAny<Record<string, string>>, false>(true);
    exact<IsAny<Record<string, string>>, true>(false);

    exact<IsAny<Function>, false>(true);
    exact<IsAny<Function>, true>(false);

    exact<IsAny<never>, false>(true);
    exact<IsAny<never>, true>(false);

    exact<IsAny<unknown>, false>(true);
    exact<IsAny<unknown>, true>(false);

    exact<IsAny<undefined>, false>(true);
    exact<IsAny<undefined>, true>(false);

    exact<IsAny<null>, false>(true);
    exact<IsAny<null>, true>(false);

    // positive cases
    exact<IsAny<any>, true>(true);
    exact<IsAny<any>, false>(false);
});
