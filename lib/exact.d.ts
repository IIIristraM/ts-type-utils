import { IsAny } from './is-any';
import { ReplaceAny } from './replace-any';

type StrictEqual<T1, T2> = (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2 ? true : false;

type Equal<T1, T2> = [T1] extends [T2]
    ? [T2] extends [T1]
        ? [StrictEqual<T1, undefined>, StrictEqual<T2, null>] extends [true, true]
            ? false
            : [StrictEqual<T1, null>, StrictEqual<T2, undefined>] extends [true, true]
            ? false
            : true
        : false
    : false;

export type Exact<T1, T2> = true extends IsAny<T1>
    ? true extends IsAny<T2>
        ? true
        : false
    : keyof T1 extends keyof T2
    ? keyof T2 extends keyof T1
        ? //  ? [T1, T2, Func, Func] extends [Func, Func, T1, T2]
          //     ? T1 extends (...args: infer A1) => infer R1
          //         ? T2 extends (...args: infer A2) => infer R2
          //             ? ReplaceAny<[...A1, R1], unknown> extends infer AR1
          //                 ? ReplaceAny<[...A2, R2], unknown> extends infer AR2
          //                     ? [AR1] extends [AR2]
          //                     ? [AR2] extends [AR1]
          //                         ? true
          //                         : false
          //                     : false
          //                 : never
          //             : never
          //         : never
          //     : never

          [Equal<T1, T2>, Equal<ReplaceAny<T1, unknown>, ReplaceAny<T2, unknown>>] extends [true, true]
            ? true
            : false
        : false
    : false;
