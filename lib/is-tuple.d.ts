export type IsTuple<T extends any[]> = number extends T['length'] ? false : true;
