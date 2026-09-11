const assert = require('node:assert/strict');
const cutout = require('./image-cutout.js');
const image = () => ({ width: 9, height: 9, data: new Uint8ClampedArray(9 * 9 * 4).fill(255) });
const logo = image();
// A dark ring enclosing a white centre: enclosed white must remain untouched.
for (let y = 2; y <= 6; y++) for (let x = 2; x <= 6; x++) {
  if (x === 2 || x === 6 || y === 2 || y === 6) logo.data.fill(20, (y * 9 + x) * 4, (y * 9 + x) * 4 + 3);
}
assert.equal(cutout(logo), true);
assert.equal(logo.data[3], 0);
assert.equal(logo.data[(4 * 9 + 4) * 4 + 3], 255);
assert.equal(logo.data[(2 * 9 + 2) * 4], 20);
const blank = image();
assert.equal(cutout(blank), false);
assert.ok(blank.data.every(v => v === 255));
const dark = image();
dark.data.fill(20);
assert.equal(cutout(dark), false);
console.log('White edges removed; enclosed white, colours, and uncertain images preserved.');
