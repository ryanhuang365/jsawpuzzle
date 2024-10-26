import { hashFromURL } from './utils.js';

const NEKOSAPI_ENDPOINT = "https://api.nekosapi.com/v3/images/random?limit=1&rating=safe"

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
        const response = await fetch(NEKOSAPI_ENDPOINT).catch((reason) => {
            console.log(reason);
        });
        if ( response instanceof Response === false ) { continue; }
        if ( response.ok === false ) { continue; }
        const responseJson = await response.json().catch((reason) => {
            console.log(reason);
        });
        if ( responseJson === undefined ) { continue; }
        console.log(responseJson);
        const data = responseJson.items[0]
        const imageUrl = data.image_url
        const sampleUrl = data.sample_url
        const tags = data.tags;
        const tagNames = tags.reduce((acc, tag) => {
            acc.push(tag.name);
            return acc;
        }, []);
        const caption = `${tagNames.join(', ')}`
        const hash = await hashFromURL(imageUrl);
        if ( excludedHashes.has(hash) ) { continue; }
        return {
            hash: hash,
            sourceURL: imageUrl,
            thumbURL: sampleUrl,
            imageURL: imageUrl,
            caption: caption,
        };
    }
}
