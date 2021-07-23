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
        const res = [];
        await this._crawl(this._options.startUrl, visitedUrls, res);
        console.log(`res.length: ${res.length}`);
        return res;
    }
    async _crawl(url, visitedUrls, res) {
        if (visitedUrls.has(url))
            return true;
        visitedUrls.add(url);
        const content = await this._contentDownloader.getContent(url);
        const links = await this._contentParser.getLinks(content);
        res.push({ url, links });
        console.log('\x1b[32m%s\x1b[0m', `Visited INSIDE URL: '${url}'`);
        const baseURLObj = new url_1.URL(url);
        (await this._contentParser.getURLs(`${baseURLObj.protocol}//${baseURLObj.hostname}`, content))
            .filter(u => new url_1.URL(u).hostname == this._baseHostname)
            .forEach(async (u) => await this._crawl(u, visitedUrls, res));
        return true;
    }
}
exports.Crawler = Crawler;
