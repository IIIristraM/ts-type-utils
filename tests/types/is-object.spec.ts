import { exact } from '../asserts';
import { IsObject } from '../../lib/is-object';
import { Indexed } from '../../lib/common';

interface NotEmptyObj {
    x: 1;
}

test('IsObject<T>', () => {
    // negative cases
    exact<IsObject<number>, false>(true);
    exact<IsObject<number>, true>(false);

    exact<IsObject<boolean>, false>(true);
    exact<IsObject<boolean>, true>(false);

    exact<IsObject<any[]>, false>(true);
    exact<IsObject<any[]>, true>(false);

    exact<IsObject<Function>, false>(true);
    exact<IsObject<Function>, true>(false);

    exact<IsObject<never>, false>(true);
    exact<IsObject<never>, true>(false);

    exact<IsObject<unknown>, false>(true);
    exact<IsObject<unknown>, true>(false);

    exact<IsObject<any>, false>(true);
    exact<IsObject<any>, true>(false);

    exact<IsObject<null>, false>(true);
    exact<IsObject<null>, true>(false);

    exact<IsObject<undefined>, false>(true);
    exact<IsObject<undefined>, true>(false);

    exact<IsObject<object | number>, false>(true);
    exact<IsObject<object | number>, true>(false);

    exact<IsObject<{} | boolean>, false>(true);
    exact<IsObject<{} | boolean>, true>(false);

    exact<IsObject<Indexed | string>, false>(true);
    exact<IsObject<Indexed | string>, true>(false);

    exact<IsObject<object | any[]>, false>(true);
    exact<IsObject<object | any[]>, true>(false);

    exact<IsObject<object & number>, false>(true);
    exact<IsObject<object & number>, true>(false);

    exact<IsObject<{} & boolean>, false>(true);
    exact<IsObject<{} & boolean>, true>(false);

    exact<IsObject<Indexed & string>, false>(true);
    exact<IsObject<Indexed & string>, true>(false);

    exact<IsObject<Indexed & any[]>, false>(true);
    exact<IsObject<Indexed & any[]>, true>(false);

    // positive cases
    exact<IsObject<object>, true>(true);
    exact<IsObject<object>, false>(false);

    exact<IsObject<{}>, true>(true);
    exact<IsObject<{}>, false>(false);

    exact<IsObject<Indexed>, true>(true);
    exact<IsObject<Indexed>, false>(false);

    exact<IsObject<Indexed | Object | {}>, true>(true);
    exact<IsObject<Indexed | Object | {}>, false>(false);

    exact<IsObject<Indexed & Object & {}>, true>(true);
    exact<IsObject<Indexed & Object & {}>, false>(false);

    exact<IsObject<NotEmptyObj | {}>, true>(true);
    exact<IsObject<NotEmptyObj | {}>, false>(false);

    exact<IsObject<NotEmptyObj>, true>(true);
    exact<IsObject<NotEmptyObj>, false>(false);
});
