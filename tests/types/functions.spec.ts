import { exact } from '../asserts';
import { ExtractArgs, ReplaceReturn, ExtractAsyncReturn } from '../../lib/functions';

test('ExtractArgs<TFunc>', () => {
    exact<ExtractArgs<(a: number, b: string) => void>, [number, string]>(true);
});

test('ReplaceReturn<TFunc, TRet>', () => {
    exact<ReplaceReturn<(a: number, b: string) => void, string>, (a: number, b: string) => string>(true);
});

test('ExtractAsyncReturn<TFunc>', () => {
    exact<ExtractAsyncReturn<(a: number, b: string) => void>, void>(true);
    exact<ExtractAsyncReturn<(a: number, b: string) => Promise<void>>, void>(true);
});
