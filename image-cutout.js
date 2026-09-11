/* Deterministic, edge-connected near-white removal. Returns false for uncertain images. */
function cutoutLogo({ data, width, height }) {
  const white = i => data[i * 4 + 3] > 240 && Math.min(...data.subarray(i * 4, i * 4 + 3)) >= 225
    && Math.max(...data.subarray(i * 4, i * 4 + 3)) - Math.min(...data.subarray(i * 4, i * 4 + 3)) <= 20;
  const edges = [];
  for (let x = 0; x < width; x++) edges.push(x, (height - 1) * width + x);
  for (let y = 1; y < height - 1; y++) edges.push(y * width, y * width + width - 1);
  if (!edges.length || edges.filter(white).length / edges.length < 0.9) return false;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0, tail = 0;
  const add = i => {
    if (!visited[i] && white(i)) { visited[i] = 1; queue[tail++] = i; }
  };
  edges.forEach(add);
  while (head < tail) {
    const i = queue[head++];
    if (i % width) add(i - 1);
    if (i % width < width - 1) add(i + 1);
    if (i >= width) add(i - width);
    if (i < width * (height - 1)) add(i + width);
  }
  // ponytail: edge heuristic cannot identify white objects; skip nearly blank images.
  if (tail / (width * height) > 0.98) return false;
  for (let n = 0; n < tail; n++) data[queue[n] * 4 + 3] = 0;
  return true;
}
if (typeof module !== 'undefined') module.exports = cutoutLogo;
