import { NonObj } from './is-object';

export type GetOptionalKeys<T> = NonNullable<
    {
        [K in keyof T]: T extends Record<K, T[K]> ? never : K;
    }[keyof T]
>;

export type GetOptional<T> = Pick<T, GetOptionalKeys<T>>;

export type GetRequired<T> = Omit<T, GetOptionalKeys<T>>;

export type DeepPartial<T> = T extends NonObj
    ? T
    : T extends Array<infer U>
    ? Array<
          {
              [K in keyof U]?: DeepPartial<U[K]>;
          }
      >
    : {
          [K in keyof T]?: DeepPartial<T[K]>;
      };
