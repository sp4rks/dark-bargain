(() => {
  function scan() {
    document.querySelectorAll('.foxshot-container:not(.blur)').forEach(wrapper => {
      if (!wrapper.querySelector('img') || wrapper.querySelector('.db-logo-toggle')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'db-logo-toggle';
      button.textContent = '◐';
      button.title = 'Toggle image dimming';
      button.setAttribute('aria-label', 'Dim image');
      button.setAttribute('aria-pressed', 'true');
      button.addEventListener('click', () => {
        const dimmed = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(dimmed));
        wrapper.classList.toggle('db-image-original', !dimmed);
      });
      wrapper.append(button);
    });
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
