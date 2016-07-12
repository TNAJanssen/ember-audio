import Ember from 'ember';

const {
  A
} = Ember;

/**
 * @module utils
 * @submodule array-methods
 */

/**
 * Given an array and an index, splits the array at index and pushes the first
 * chunk to the end of the second chunk.
 *
 * @private
 * @method arraySwap
 * @param {array} arr An array to split, shift and rejoin.
 * @param {number} index The index where the split should occur.
 * @returns {array} The swapped/shifted array.
 */
export function arraySwap(arr, index) {
  const endOfArr = arr.slice(0, index);
  const beginOfArr = A(arr.slice(index));
  return beginOfArr.pushObjects(endOfArr);
}

/**
 * Flattens an array of arrays into a shallow array.
 *
 * @private
 * @method flatten
 * @param {arrayOfArrays} arr An array to flatten.
 * @returns {array} The flattened array.
 */
export function flatten(arrayOfArrays) {
  return A(arrayOfArrays).reduce((a, b) => A(a).concat(b));
}
