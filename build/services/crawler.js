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
        return res;
    }
    async _crawl(url, visitedUrls, res) {
        try {
            if (visitedUrls.has(url))
                return;
            visitedUrls.add(url);
            const content = await this._contentDownloader.getContent(url);
            const links = await this._contentParser.getLinks(content);
            res.push({ url, links });
            console.log('\x1b[32m%s\x1b[0m', `Processing URL: '${url}'`);
            const baseURLObj = new url_1.URL(url);
            const urls = await this._contentParser.getURLs(`${baseURLObj.protocol}//${baseURLObj.hostname}`, content);
            for (const urlDoc of urls) {
                if (new url_1.URL(urlDoc).hostname != this._baseHostname)
                    continue;
                await this._crawl(urlDoc, visitedUrls, res);
            }
        }
        catch (err) {
            console.log('\x1b[31m%s\x1b[0m', `Error crawling URL: '${url}', Error: ${JSON.stringify(err)}`);
        }
    }
}
exports.Crawler = Crawler;
