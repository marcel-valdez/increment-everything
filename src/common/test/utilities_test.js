import { assert } from 'chai';
import { toFormattedString } from 'common/lib/utilities.js';


const obj = {
  0: "zero",
  b: {
    c: "a",
    d: [],
    e: [1, 2, 3]
  }
};
describe('test utilities', function () {
  it('can turn an object into a string', function testToFormattedString() {
    const expected = "\n0:zero (string)\n" +
          "b:\n" +
          "  c:a (string)\n" +
          "  d:[] (Empty)\n" +
          "  e:\n" +
          "    0:1 (number)\n" +
          "    1:2 (number)\n" +
          "    2:3 (number)";
    assert.equal(toFormattedString(obj), expected);
  });
  it('can use a depth limit', function() {
    const expected = "\n0: <max depth reached>\n" +
          "b: <max depth reached>";
    assert.equal(toFormattedString(obj, 1), expected);
  });
});
