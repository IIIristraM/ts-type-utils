export type ExtractArgs<TFunc> = TFunc extends { (...args: infer TArgs): any } ? TArgs : never;

export type ReplaceReturn<TFunc, TRet> = TFunc extends {
    (...args: infer TArgs): any;
}
    ? (...args: TArgs) => TRet
    : never;

export type ExtractAsyncReturn<TFunc extends (...args: any[]) => any> = ReturnType<TFunc> extends Promise<infer U>
    ? U
    : ReturnType<TFunc>;
