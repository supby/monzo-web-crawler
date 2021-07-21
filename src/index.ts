import { ContentDownloader } from "./services/contentDownloader";
import { ContentParser } from "./services/contentParser";

const s1 = new ContentDownloader();
s1.getContent('https://monzo.com').then(async content => {
    const s2 = new ContentParser(content);
    console.log((await s2.getLinks()).map(l => l.text))
})
