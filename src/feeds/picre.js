import { hashFromURL } from './utils.js';

const PICRE_ENDPOINT = "https://pic.re/image.json"

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
        const response = await fetch(PICRE_ENDPOINT).catch((reason) => {
            console.log(reason);
        });
        if ( response instanceof Response === false ) { continue; }
        if ( response.ok === false ) { continue; }
        const responseJson = await response.json().catch((reason) => {
            console.log(reason);
        });
        if ( responseJson === undefined ) { continue; }
        console.log(responseJson);
        const url = 'https://' + responseJson.file_url;
        const source = responseJson.source ? responseJson.source : url;
        const author = responseJson.author ? responseJson.author : 'unknown';
        const tags = responseJson.tags;
        const caption = `${tags.join(', ')}<hr>Author: ${author}`
        const hash = await hashFromURL(url);
        if ( excludedHashes.has(hash) ) { continue; }
        return {
            hash: hash,
            sourceURL: source,
            thumbURL: '',
            imageURL: url,
            caption: caption,
        };
    }
}
