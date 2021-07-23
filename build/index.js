"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentDownloader_1 = require("./services/contentDownloader");
const contentParser_1 = require("./services/contentParser");
const crawler_1 = require("./services/crawler");
const downloader = new contentDownloader_1.ContentDownloader();
const paerser = new contentParser_1.ContentParser();
const crawler = new crawler_1.Crawler({
    startUrl: 'https://monzo.com'
}, downloader, paerser);
crawler.crawl().then(data => console.log(data));
function printData(data) {
    for (const urlData of data) {
        console.log('\x1b[32m%s\x1b[0m', `Visited URL: '${urlData.url}'`);
        for (const link of urlData.links) {
            console.log(`Link: Text='${link.text}', URL='${link.url}'`);
        }
    }
}
