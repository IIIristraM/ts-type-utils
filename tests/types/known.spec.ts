import { exact } from '../asserts';
import { KnownKeys, PickKnown } from '../../lib/known';

test('KnownKeys<T>', () => {
    exact<
        KnownKeys<{
            [str: string]: any;
            [num: number]: unknown;
            x: number;
            y: string;
        }>,
        'x' | 'y'
    >(true);

    exact<
        KnownKeys<{
            x: number;
            y: string;
        }>,
        'x' | 'y'
    >(true);

    exact<KnownKeys<undefined>, unknown>(true);
    exact<KnownKeys<null>, unknown>(true);
    exact<KnownKeys<never>, unknown>(true);
    exact<KnownKeys<{}>, unknown>(true);
    exact<KnownKeys<number>, unknown>(true);
    exact<KnownKeys<any>, never>(true);
});

test('PickKnown<T>', () => {
    exact<
        PickKnown<{
            [str: string]: any;
            [num: number]: unknown;
            x: number;
            y: string;
        }>,
        {
            x: number;
            y: string;
        }
    >(true);

    exact<PickKnown<undefined>, {}>(true);
    exact<PickKnown<null>, {}>(true);
    exact<PickKnown<never>, {}>(true);
    exact<PickKnown<{}>, {}>(true);
    exact<PickKnown<number>, {}>(true);
    exact<PickKnown<any>, {}>(true);
});
