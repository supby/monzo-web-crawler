"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentDownloader_1 = require("./services/contentDownloader");
const contentParser_1 = require("./services/contentParser");
const s1 = new contentDownloader_1.ContentDownloader();
s1.getContent('https://monzo.com').then(async (content) => {
    const s2 = new contentParser_1.ContentParser(content);
    console.log((await s2.getLinks()).map(l => l.text));
});
