export type Class<T> = { new(...args: any[]): T };

type FunctionType = (...args: any[]) => any;
type FunctionReturnType<T> = T extends FunctionType ? ReturnType<T> : never;
type FunctionParametersType<T> = T extends FunctionType ? Parameters<T> : never;
type JestMockType<T> = jest.Mock<FunctionReturnType<T>, FunctionParametersType<T>>;

export type Mock<T> = T & {
    // all functions are converted to jest.Mock with corresponding return type (generics passed to jest.Mock)
    [P in keyof T as T[P] extends FunctionType ? P : never]: JestMockType<T[P]>;
};