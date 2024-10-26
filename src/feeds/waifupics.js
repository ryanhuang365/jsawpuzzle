import { hashFromURL } from './utils.js';

const WAIFUPICS_ENDPOINT = "https://api.waifu.pics/sfw/waifu"

export async function getRandomPicture(details = {}) {
    const excludedHashes = new Set();
    if ( details.solved ) {
        details.solved.forEach(a => excludedHashes.add(a));
    }
    if ( details.discarded ) {
        details.discarded.forEach(a => excludedHashes.add(a));
    }
    let tryCount = 8;
    for (;;) {
        if ( tryCount <= 0 ) { break; }
        tryCount -= 1;
        const response = await fetch(WAIFUPICS_ENDPOINT).catch((reason) => {
            console.log(reason);
        });
        if ( response instanceof Response === false ) { continue; }
        if ( response.ok === false ) { continue; }
        const responseJson = await response.json().catch((reason) => {
            console.log(reason);
        });
        if ( responseJson === undefined ) { continue; }
        const url = responseJson.url;
        const hash = await hashFromURL(url);
        if ( excludedHashes.has(hash) ) { continue; }
        return {
            hash: hash,
            sourceURL: url,
            thumbURL: '',
            imageURL: url,
            caption: '',
        };
    }
}
