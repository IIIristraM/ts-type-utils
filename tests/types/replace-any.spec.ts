import { ReplaceAny, ReplaceAnyReturn, ReplaceAnyArgs } from '../../lib/replace-any';
import { exact } from '../asserts';

test('ReplaceAnyReturn<T, R>', () => {
    exact<ReplaceAnyReturn<() => any, { a: 1 }>, () => { a: 1 }>(true);
    exact<ReplaceAnyReturn<() => any, { a: 1 }>, () => any>(false);
    exact<ReplaceAnyReturn<() => number, { a: 1 }>, () => number>(true);
});

test('ReplaceAnyArgs<T, R>', () => {
    exact<ReplaceAnyArgs<(...args: any[]) => any, { a: 1 }>, (...args: Array<{ a: 1 }>) => any>(true);
});

test('ReplaceAny<T, R>', () => {
    exact<ReplaceAny<any, unknown>, unknown>(true);
    exact<ReplaceAny<any[], unknown>, unknown[]>(true);
    exact<ReplaceAny<[any, number], unknown>, [unknown, number]>(true);
    exact<ReplaceAny<{ x?: any }, unknown>, { x?: unknown }>(true);
    exact<ReplaceAny<{ x: any[] }, { a: 1 }>, { x: { a: 1 }[] }>(true);
});
