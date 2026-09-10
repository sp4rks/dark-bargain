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
  const offer = document.createElement('div');
  offer.className = 'db-offer';

  // Only lift an unambiguous offer; never turn a saving or minimum spend into a price.
  const headline = title.dataset.title || title.textContent;
  const prices = headline.match(/\$\d[\d,]*(?:\.\d{2})?/g) || [];
  const percent = headline.match(/^\s*(\d+(?:\.\d+)?% off)\b/i);
  // ponytail: conservative title heuristic; use structured prices if OzBargain exposes them.
  const price = prices.length === 1 && !/\boff\b|\bspend\b|\bminimum\b|\bcashback\b|\bcredit\b|\bgift card\b|\bbonus\b|\bfrom\b|\bwas\b|\bsave\b|\/\s*(?:m|month|year|wk)\b/i.test(headline)
    ? prices[0] : null;
  if (percent || price) {
    const amount = document.createElement('strong');
    amount.className = 'db-offer-price';
    amount.textContent = percent?.[1] || price;
    offer.append(amount);
  }
  if (goto) offer.append(goto);
  const submitted = body.querySelector(':scope > .submitted');
  if (offer.childNodes.length) (submitted || title).after(offer);

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
    sidebar.prepend(card);
  }

  const metadata = document.querySelector('.nodefooter .nodemeta');
  if (metadata) {
    metadata.classList.add('db-deal-actions');
    (offer.isConnected ? offer : submitted || title).after(metadata);
  }
})();
