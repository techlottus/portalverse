// https://dev.to/denniscual/typescript-hack-simple-utility-type-for-changing-type-of-keys-4bba
export type Replace<T extends object, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key];
};
