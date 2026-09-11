# Dark Bargain

A small Firefox extension that gives OzBargain a warmer, calmer dark theme. It
uses a shared stylesheet and a small deal-page script that moves existing
elements. Links, voting, comments and menus retain their original controls.

## Install locally

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Choose **Load Temporary Add-on…**.
3. Select [`manifest.json`](./manifest.json).
4. Open or reload an OzBargain page.

The extension runs on `ozbargain.com.au` and needs no additional host permissions.
Images use CSS brightness and contrast adjustments, with a small ◐ toggle to keep
the original visible. Hover or keyboard focus temporarily restores the original.
Blurred images are left alone. No image fetching or pixel processing is performed.

Deal pages group the product image, store details, original deal link and cashback
control in the sidebar. Prices and offer conditions remain in the full headline.
