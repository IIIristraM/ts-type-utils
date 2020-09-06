import { IsAny } from './is-any';
import { ReplaceAny } from './replace-any';

// type Func = (...args: any[]) => any;

export type Exact<T1, T2> = true extends IsAny<T1>
    ? true extends IsAny<T2>
        ? true
        : false
    : keyof T1 extends keyof T2
    ? keyof T2 extends keyof T1
        ? // ? [T1, T2, Func, Func] extends [Func, Func, T1, T2]
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
          ReplaceAny<T1, unknown> extends infer T1U
            ? ReplaceAny<T2, unknown> extends infer T2U
                ? [T1U] extends [T2U]
                    ? [T2U] extends [T1U]
                        ? true
                        : false
                    : false
                : never
            : never
        : false
    : false;
