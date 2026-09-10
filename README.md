# Dark Bargain

A small Firefox extension that gives OzBargain a warmer, calmer dark theme. It
is CSS-only, so OzBargain's links, voting, comments, menus and htmx updates keep
their existing behaviour.

## Install locally

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Choose **Load Temporary Add-on…**.
3. Select [`manifest.json`](./manifest.json).
4. Open or reload an OzBargain page.

The extension is deliberately scoped to `ozbargain.com.au` and currently has no
permissions or network access.
