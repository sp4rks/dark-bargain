(() => {
  const node = document.querySelector('.node-ozbdeal.node-page');
  const title = document.querySelector('#main > #title');
  const body = node?.querySelector(':scope > .n-right');
  if (!node || !title || !body || node.dataset.darkBargain) return;
  node.dataset.darkBargain = 'true';
  document.body.classList.add('db-deal-page');
  const crumbs = document.querySelector('#header2nd ul');
  if (crumbs) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = '/deals';
    link.textContent = 'Deals';
    item.append(link);
    crumbs.prepend(item);
  }

  // Move the original nodes so IDs, listeners and site-owned state survive.
  body.prepend(title);
  const media = body.querySelector(':scope > .right');
  const goto = media?.querySelector('.gotodeal');
  const cashback = media?.querySelector('.cashback');
  const submitted = body.querySelector(':scope > .submitted');

  const sidebar = document.querySelector('main #sidebar');
  const stores = document.querySelector('section.relatedstores');
  if (sidebar && (media || stores)) {
    const card = document.createElement('section');
    card.className = 'db-store-card';
    card.setAttribute('aria-label', 'Deal image and stores');
    if (media) card.append(media);
    if (stores) {
      card.append(stores);
      document.querySelector('#relatedstores')?.remove();
    }
    if (goto) card.append(goto);
    if (cashback) card.append(cashback);
    sidebar.prepend(card);
  }

  const metadata = document.querySelector('.nodefooter .nodemeta');
  if (metadata) {
    metadata.classList.add('db-deal-actions');
    (submitted || title).after(metadata);
  }
})();
