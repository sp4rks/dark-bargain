# Dark Bargain

A small Firefox extension that gives OzBargain a warmer, calmer dark theme. It
uses a shared stylesheet and a small deal-page script that moves existing
elements. Links, voting, comments and menus retain their original controls.

## Install locally

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Choose **Load Temporary Add-on…**.
3. Select [`manifest.json`](./manifest.json).
4. Open or reload an OzBargain page.

The extension is deliberately scoped to `ozbargain.com.au` and currently has no
permissions or network access.

Deal pages show a price when the headline has one unambiguous dollar amount,
or a leading percentage discount. Multi-price and savings offers retain their
full headline instead of guessing a price.
