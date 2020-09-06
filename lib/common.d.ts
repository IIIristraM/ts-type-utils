export type TryOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type InstanceOf<T> = T extends { new (...args: any[]): infer I } ? I : never;

export type Indexed<T = any> = Record<string, T>;
