type ANY_LITERAL = '__$ANY_LITERAL$__';

type NOT_ANY_LITERAL = '__$NOT_ANY_LITERAL$__';

type AnyPrecheck<T> = T extends never ? ANY_LITERAL : NOT_ANY_LITERAL;

export type IsAny<T> = AnyPrecheck<T> extends NOT_ANY_LITERAL ? false : true;
