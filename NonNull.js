/**
 * @template T
 * @param {T} o
 * @param {string} context
 * @returns {NonNullable<T>}
 */
export const NonNull = (o, context = "none") => {
  if (o === null || o === undefined)
    throw new Error(`non-null assertion failed! context: ${context}`);
  return o;
};

export default NonNull;
