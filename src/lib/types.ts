export type Class<T> = { new(...args: any[]): T };

export type Mock<T> = T & {
    // all functions are converted to jest.Mock with corresponding return type (generic passed to jest.Mock)
    [P in keyof T as T[P] extends Function ? P : never]: jest.Mock<T[P] extends (...args: any[]) => any ? ReturnType<T[P]> : never>;
};