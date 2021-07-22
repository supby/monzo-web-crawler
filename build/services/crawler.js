"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawler = void 0;
const url_1 = require("url");
class Crawler {
    constructor(options, contentDownloader, contentParser) {
        this._options = options;
        this._contentDownloader = contentDownloader;
        this._contentParser = contentParser;
        this._baseHostname = new url_1.URL(options.startUrl).hostname;
    }
    async crawl() {
        const visitedUrls = new Set();
        await this._crawl(this._options.startUrl, visitedUrls);
    }
    async _crawl(url, visitedUrls) {
        if (visitedUrls.has(url))
            return;
        console.log('\x1b[32m%s\x1b[0m', `Visiting URL: '${url}'`);
        visitedUrls.add(url);
        const content = await this._contentDownloader.getContent(url);
        const links = await this._contentParser.getLinks(content);
        this._printLinks(links);
        (await this._contentParser.getURLs(content))
            .filter(u => new url_1.URL(u).hostname == this._baseHostname)
            .forEach(u => this._crawl(u, visitedUrls));
    }
    _printLinks(links) {
        if (!links || links.length == 0) {
            console.log('No links on the page.');
            return;
        }
        console.log('Links:');
        for (const link of links) {
            console.log(link);
        }
    }
}
exports.Crawler = Crawler;
