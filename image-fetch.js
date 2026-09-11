browser.runtime.onMessage.addListener(async (message, sender) => {
  if (sender.id !== browser.runtime.id || message?.type !== 'logo-image') return;
  const url = new URL(message.url);
  if (url.origin !== 'https://files.ozbargain.com.au' || !/^\/d\/\d+\/\d+l?\.(?:png|jpg|jpeg|webp)$/.test(url.pathname)) {
    throw new Error('Not an OzBargain store logo');
  }
  const response = await fetch(url, { credentials: 'omit', redirect: 'error', signal: AbortSignal.timeout(10000) });
  if (!response.ok || !/^image\/(png|jpeg|webp)(;|$)/i.test(response.headers.get('content-type') || '')) {
    throw new Error('Image unavailable');
  }
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 2 * 1024 * 1024) {
      await reader.cancel();
      throw new Error('Image too large');
    }
    chunks.push(value);
  }
  const blob = new Blob(chunks, { type: response.headers.get('content-type') });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Image read failed'));
    reader.readAsDataURL(blob);
  });
});
