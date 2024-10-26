# JSaw Puzzle

A browser extension to create and solve jigsaw puzzles.

<a href="https://addons.mozilla.org/addon/jsaw-puzzle/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get JSaw Puzzle for Firefox"></a>
<a href="https://chrome.google.com/webstore/detail/jsaw-puzzle/ikmogfgjninnidjikclffnfcblehkbak"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get JSaw Puzzle for Chromium"></a>

## Screenshots

![Screenshot 1](https://raw.githubusercontent.com/gorhill/jsawpuzzle/main/screenshots/screenshot-1.png)

<details><summary>More...</summary>

![Screenshot 2](https://raw.githubusercontent.com/gorhill/jsawpuzzle/main/screenshots/screenshot-2.png)

![Screenshot 3](https://raw.githubusercontent.com/gorhill/jsawpuzzle/main/screenshots/screenshot-3.png)

</details>

## Picture feeds

The extension can fetch random pictures from different feeds. Currently it can fetch from [Wikimedia Commons](https://commons.wikimedia.org/), [Public Domain Pictures](https://www.publicdomainpictures.net/), [waifu.im](https://www.waifu.im/), and [waifu.pics](https://waifu.pics/).

**Important:** Firefox version 126.0 and below requires that you explicitly grant permissions to be able fetch pictures from remote servers:

![image](https://github.com/gorhill/jsawpuzzle/assets/585534/d4c2b4c6-4c56-4154-b276-8e62fb90aeb5)

## To build the extension

At the command line, type `make firefox` or `make chromium` to build the extension for either Firefox or Chromium. A `jsawpuzzle.firefox` or `jsawpuzzle.chromium` folder will appear under `./build/`, which can be side-loaded as an extension in Firefox or Chromium.

> On Windows, use WSL to `make`. There might be the error `/usr/bin/env: ‘bash\r’: No such file or directory` based on git autocrlf settings. To fix this, run `sed -i $'s/\r$//' ./tools/copy-common-files.sh && sed -i $'s/\r$//' ./tools/make-chromium.sh && sed -i $'s/\r$//' ./tools/make-firefox.sh`

### Adding to Chrome

1. Go to <chrome://extensions/>
2. Toggle on `Developer mode`
3. Click `Load unpacked` and select the `./build/jsawpuzzle.chromium` folder

### Debugging on Firefox

> Since this is a temporary add-on, it will be automatically removed once Firefox terminates.

1. Go to <about:debugging#/runtime/this-firefox>
2. Click `Load Temporary Add-on...` and select `./build/jsawpuzzle.firefox/manifest.json`

### Adding to Firefox

> Unsigned extensions can only be added to Firefox Developer Edition or Firefox Nightly.

1. Install Firefox Developer Edition or Firefox Nightly
2. Go to <about:config>
3. Set `xpinstall.signatures.required` to `false`
4. Install `web-ext` by running `npm install --global web-ext` or use an alternative method from <https://github.com/mozilla/web-ext>
5. Open a terminal in the root directory of this project and run `web-ext build --source-dir "./build/jsawpuzzle.firefox" --artifacts-dir "./build/web-ext-artifacts"`
6. Go to <about:addons>
7. Click the gear in the top right
8. Click `Install Add-on From File...` and select `./build/web-ext-artifacts/jsaw_puzzle-1.0.zip`

## Motivation

A project [started in 2009](https://github.com/gorhill/jigsawpuzzle-rhill) but never completed as originally envisioned. This repository is that project brought to completion.
