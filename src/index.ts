type Fn = (...args: unknown[]) => unknown

function isFunction<T extends Fn>(value: unknown): value is T {
  return typeof value === "function"
}

/**
 * A type on which we can call the `resolve` method to return the type `T`.
 *
 * To get to the resolved value `T`, the actual type can be:
 *
 * - T
 * - Promise<T>        (needs to be awaited)
 * - () => T           (function that returns T)
 * - () => Promise<T>  (async function that returns T)
 */
export type Resolvable<T> = T | Promise<T> | (() => T) | (() => Promise<T>)

export async function resolve<T>(resolvableValue: Resolvable<T>): Promise<T> {
  /**
   * This doesn't work if we use `typeof resolvableValue === Function` so
   * we need to add the `isFunction` method. See this TypeScript issue
   * below for more information.
   *
   * https://github.com/microsoft/TypeScript/issues/37663#issuecomment-1081610403
   */
  const promisableValue: T | Promise<T> = isFunction(resolvableValue)
    ? resolvableValue()
    : resolvableValue
  const value = await promisableValue
  return value
}
