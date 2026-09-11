# Dark Bargain

A small Firefox extension that gives OzBargain a warmer, calmer dark theme. It
uses a shared stylesheet and a small deal-page script that moves existing
elements. Links, voting, comments and menus retain their original controls.

## Install locally

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Choose **Load Temporary Add-on…**.
3. Select [`manifest.json`](./manifest.json).
4. Open or reload an OzBargain page.

The extension runs on `ozbargain.com.au`. Store-logo background removal requests
access to `files.ozbargain.com.au`; it only fetches store logos under `/d/`, without
credentials. Processing is local, with no external image-processing service.

Eligible logos get a small ◐ toggle for the original or cutout. Background removal
only applies to mostly white-edged logos, not product photos or blurred images.
White parts connected to the background may also disappear; use the toggle to
restore the original. Run `node test-image-cutout.cjs` to check the pixel algorithm.

Deal pages group the product image, store details, original deal link and cashback
control in the sidebar. Prices and offer conditions remain in the full headline.
