# ts-type-utils

- [ts-type-utils](#ts-type-utils)
    - [`TryOmit<T, K>`](#tryomitt-k)
    - [`InstanceOf<T>`](#instanceoft)
    - [`Indexed<T>`](#indexedt)
    - [`IsAny<T>`](#isanyt)
    - [`IsObject<T>`](#isobjectt)
    - [`IsTuple<T>`](#istuplet)
    - [`Exact<T1, T2>`](#exactt1-t2)
    - [`ExtractByType<T, S>`](#extractbytypet-s)
    - [`ExtractArgs<TFunc>`](#extractargstfunc)
    - [`ReplaceReturn<TFunc, TRet>`](#replacereturntfunc-tret)
    - [`ExtractAsyncReturn<TFunc>`](#extractasyncreturntfunc)
    - [`KnownKeys<T>`](#knownkeyst)
    - [`PickKnown<T>`](#pickknownt)
    - [`GetOptionalKeys<T>`](#getoptionalkeyst)
    - [`GetOptional<T>`](#getoptionalt)
    - [`GetRequired<T>`](#getrequiredt)
    - [`DeepPartial<T>`](#deeppartialt)
    - [`Merge<T1, T2>`](#merget1-t2)

All types could be used with any value of `strictNullChecks` option of `tsconfig`.

### `TryOmit<T, K>`

Omits keys if they exists, otherwise does nothing

```ts
type X = TryOmit<{ a: 1; b: 2 }, 'c'>; // { a: 1; b: 2 }
type X = TryOmit<{ a: 1; b: 2; c: 3 }, 'c'>; // { a: 1; b: 2 }
```

### `InstanceOf<T>`

Returns instance type if constructor provided, otherwise returns `never`

```ts
class Test {}

type X = InstanceOf<typeof Test>; // Test
type X = InstanceOf<{}>; // never
```

### `Indexed<T>`

Alias for `Record<string, T>`

### `IsAny<T>`

Returns `true` if `T` is `any` and `false` otherwise

```ts
type X = IsAny<null>; // false
type X = IsAny<undefined>; // false
type X = IsAny<any[]>; // false
type X = IsAny<never>; // false
type X = IsAny<unknown>; // false
type X = IsAny<number>; // false

type X = IsAny<any>; // true
```

### `IsObject<T>`

Returns `true` if `T` describes an object and `false` otherwise

```ts
type X = IsObject<number>; // false
type X = IsObject<any[]>; // false
type X = IsObject<Function>; // false
type X = IsObject<never>; // false
type X = IsObject<unknown>; // false
type X = IsObject<any>; // false
type X = IsObject<null>; // false
type X = IsObject<undefined>; // false

type X = IsObject<object>; // true
type X = IsObject<{}>; // true
type X = IsObject<Indexed>; // true
type X = IsObject<Indexed | Object | {}>; // true
type X = IsObject<Indexed & Object & {}>; // true
```

### `IsTuple<T>`

Returns `true` if `T` is tuple and `false` otherwise

```ts
type X = IsTuple<[any]>; // true
type X = IsTuple<any[]>; // false
```

### `Exact<T1, T2>`

Returns `true` if `T1` and `T2` are the same and `false` otherwise

```ts
type X = Exact<{ x: 1 }, { x: 2 }>; // false
type X = Exact<{ x: 1 }, { x: 1 }>; // true
```

Known issues:

-   type is not designed to handle function-types
-   type compares optional properties only if they represented in both parameters

```ts
type X = Exact<{ x: { y?: string }, { x: { y?: number } }>; // false
type X = Exact<{ x: { y?: string }, { x: {} }>; // true - only T1 has "y" key and it's optional
```

### `ExtractByType<T, S>`

Picks properties of particular type from the source type

```ts
type X = ExtractByType<
    {
        a: any;
        b: number;
        c: unknown;
        d: never;
        e: null;
        f: undefined;
        g?: number;
    },
    number
>; /* {
    b: number;
    g?: number;
} */
```

### `ExtractArgs<TFunc>`

Returns args type if function type provided, otherwise returns `never`

```ts
type X = ExtractArgs<(a: number, b: string) => void>; // [number, string]
```

### `ReplaceReturn<TFunc, TRet>`

Replaces return type for provided function type

```ts
type X = ReplaceReturn<(a: number, b: string) => void, string>; // (a: number, b: string) => string
```

### `ExtractAsyncReturn<TFunc>`

Infers return type, and in case a promise returned, infers promise resolution type

```ts
type X = ExtractAsyncReturn<(a: number, b: string) => void>; // void
type X = ExtractAsyncReturn<(a: number, b: string) => Promise<void>>; // void
```

### `KnownKeys<T>`

If `T` consists of indexed declaration and particular keys, this keys will be returned, if no such keys `unknown` returned

```ts
type X = KnownKeys<{
    [str: string]: any;
    [num: number]: unknown;
    x: number;
    y: string;
}>; // 'x' | 'y'
```

### `PickKnown<T>`

Creates new type from `T` by picking known keys

```ts
type X = PickKnown<{
    [str: string]: any;
    [num: number]: unknown;
    x: number;
    y: string;
}>; /* {
    x: number;
    y: string;
} */
```

### `GetOptionalKeys<T>`

Returns keys marked as optional

```ts
type X = GetOptionalKeys<{ a: number; b?: undefined; c?: {} }>; // 'b' | 'c'
```

### `GetOptional<T>`

Creates new type from `T` by picking optional keys

```ts
type X = GetOptional<{ a: undefined; b?: string; c?: undefined }>; // { b?: string; c?: undefined }
```

### `GetRequired<T>`

Creates new type from `T` by picking required keys

```ts
type X = GetRequired<{ a: null; b?: string; c?: {} }>; // { a: null }
```

### `DeepPartial<T>`

Recursively makes all keys optional

```ts
type X = DeepPartial<{
    s: {
        b: {
            c: number;
        }[];
    };
}>; /*
{
    s?: {
        b?: {
            c?: number;
        }[];
    };
} */
```

### `Merge<T1, T2>`

Recursively merge two types

```ts
type X = Merge<
    {
        a: string;
        b: { c: Array<{ d: number; d2: boolean }> };
        [x: number]: { e?: any };
    },
    {
        b: { c: Array<{ d?: string }>; c2: number };
        [x: number]: { e: boolean };
        f: null;
    }
>; /* {
    a: string;
    b: { c: Array<{ d?: string; d2: boolean }>; c2: number };
    [x: number]: { e: boolean };
    f: null;
} */
```
