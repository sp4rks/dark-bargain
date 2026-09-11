(() => {
  const states = new WeakMap();
  async function process(img) {
    const source = img.currentSrc || img.src;
    const previous = states.get(img);
    if (previous?.source === source) return;
    previous?.canvas?.remove();
    previous?.button?.remove();
    img.classList.remove('db-logo-original-hidden', 'db-logo-show-original');
    const state = { source };
    states.set(img, state);
    const wrapper = img.closest('.foxshot-container');
    if (!wrapper || wrapper.classList.contains('blur') || !/^https:\/\/files\.ozbargain\.com\.au\/d\//.test(source)) return;
    try {
      const data = await browser.runtime.sendMessage({ type: 'logo-image', url: source });
      const decoded = new Image();
      decoded.src = data;
      await decoded.decode();
      if (decoded.naturalWidth * decoded.naturalHeight > 1000000) return;
      const canvas = document.createElement('canvas');
      canvas.width = decoded.naturalWidth;
      canvas.height = decoded.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(decoded, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (!cutoutLogo(pixels) || states.get(img) !== state || !img.isConnected || (img.currentSrc || img.src) !== source) return;
      ctx.putImageData(pixels, 0, 0);
      canvas.className = 'db-logo-cutout';
      canvas.setAttribute('aria-hidden', 'true');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'db-logo-toggle';
      button.textContent = '◐';
      button.setAttribute('aria-label', 'Remove white background');
      button.title = 'Toggle original image / background removed';
      button.setAttribute('aria-pressed', 'true');
      img.classList.add('db-logo-original-hidden');
      button.addEventListener('click', () => {
        const active = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(active));
        canvas.hidden = !active;
        img.classList.toggle('db-logo-original-hidden', active);
        img.classList.toggle('db-logo-show-original', !active);
      });
      img.parentElement.classList.add('db-logo-link');
      img.parentElement.append(canvas);
      wrapper.append(button);
      Object.assign(state, { canvas, button });
    } catch {
      // A denied permission, unavailable image or decode failure leaves the original intact.
    }
  }
  let scheduled = false;
  function scan() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      document.querySelectorAll('.foxshot-container img').forEach(process);
    });
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
  document.addEventListener('load', scan, true);
  scan();
})();
