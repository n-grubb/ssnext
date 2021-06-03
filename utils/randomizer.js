/**
 * Randomly generate a 5 character string.
 * @returns {string} - a randomly generated 5 character alphanumeric string.
 */
export const random5Chars = () => {
  return Math.random().toString(36).substr(2, 5)
}