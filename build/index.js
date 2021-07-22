"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentDownloader_1 = require("./services/contentDownloader");
const contentParser_1 = require("./services/contentParser");
const crawler_1 = require("./services/crawler");
const downloader = new contentDownloader_1.ContentDownloader();
const paerser = new contentParser_1.ContentParser({
    baseHostname: 'monzo.com',
    baseProtocol: 'https'
});
const crawler = new crawler_1.Crawler({
    startUrl: 'https://monzo.com'
}, downloader, paerser);
crawler.crawl();
