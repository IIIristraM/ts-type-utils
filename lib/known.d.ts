export type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
    ? U
    : never;

export type PickKnown<T> = Pick<T, Extract<KnownKeys<T>, keyof T>>;
