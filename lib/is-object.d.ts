type OBJECT_LITERAL = '__$OBJECT_LITERAL$__';

type NOT_OBJECT_LITERAL = '__$NOT_OBJECT_LITERAL$__';

type ObjectPrecheck<T> = [T] extends [never]
    ? NOT_OBJECT_LITERAL
    : T extends object
    ? T extends NonObj | any[]
        ? NOT_OBJECT_LITERAL
        : OBJECT_LITERAL
    : NOT_OBJECT_LITERAL;

export type IsObject<T> = ObjectPrecheck<T> extends OBJECT_LITERAL ? true : false;

export type NonObj = number | string | boolean | Function | null | undefined;
