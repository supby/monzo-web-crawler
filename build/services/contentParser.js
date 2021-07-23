"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentParser = void 0;
const node_html_parser_1 = require("node-html-parser");
class ContentParser {
    constructor() {
        this.urlRegexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    }
    getLinks(content) {
        return new Promise((resolve, reject) => {
            const doc = node_html_parser_1.parse(content);
            const links = doc.querySelectorAll('a')
                .map(link => ({ text: link.text.trim(), url: link.getAttribute('href') || '' }));
            resolve(links);
        });
    }
    async getURLs(baseURL, content) {
        const textUrls = await this._getTextURLs(content);
        const links = await this.getLinks(content);
        const res = links
            .map(l => new URL(l.url, baseURL).href)
            .concat(textUrls);
        return res;
    }
    _getTextURLs(content) {
        return new Promise((resolve, reject) => {
            const matches = content.match(this.urlRegexp);
            if (!matches) {
                resolve([]);
                return;
            }
            resolve(matches);
        });
    }
}
exports.ContentParser = ContentParser;
