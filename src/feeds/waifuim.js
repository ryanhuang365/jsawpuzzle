import { hashFromURL } from './utils.js';

const WAIFUIM_ENDPOINT = "https://api.waifu.im/search/?is_nsfw=false"

async function getImage() {
    const response = await fetch(WAIFUIM_ENDPOINT).catch((reason) => {
        console.log(reason);
    });
    if ( response instanceof Response === false ) { return; }
    if ( response.ok === false ) { return; }
    const responseText = await response.text().catch((reason) => {
        console.log(reason);
    });
    if ( typeof responseText !== 'string' ) { return; }
    return responseText;
}

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
        const responseString = await getImage();
        if ( responseString === undefined ) { continue; }
        const responseJson = JSON.parse(responseString);
        const data = responseJson.images[0]
        const url = data.url;
        const source = data.source;
        const tags = data.tags[0];
        const caption = `[${tags.name}] ${tags.description}`
        const hash = await hashFromURL(url);
        if ( excludedHashes.has(hash) ) { continue; }
        return {
            hash: hash,
            sourceURL: source,
            thumbURL: '',
            imageURL: url,
            caption: caption || '',
        };
    }
}
