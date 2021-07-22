"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentParser = void 0;
const node_html_parser_1 = require("node-html-parser");
class ContentParser {
    constructor(options) {
        this._options = options;
    }
    getLinks(content) {
        return new Promise((resolve, reject) => {
            const doc = node_html_parser_1.parse(content);
            const links = doc.querySelectorAll('a')
                .map(link => ({ text: link.text.trim(), url: link.getAttribute('href') || '' }));
            resolve(links);
        });
    }
    async getURLs(content) {
        const textUrls = await this._getTextURLs(content);
        const links = await this.getLinks(content);
        return links
            .filter(l => !this.isURL(l.url))
            .map(l => {
            return `${this._options.baseProtocol}://${this._options.baseHostname}${l.url}`;
        }).concat(textUrls);
    }
    isURL(url) {
        const regexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return (url.match(regexp) || []).length > 0;
    }
    _getTextURLs(content) {
        const regexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return new Promise((resolve, reject) => {
            const matches = content.match(regexp);
            if (!matches) {
                resolve([]);
                return;
            }
            resolve(matches);
        });
    }
}
exports.ContentParser = ContentParser;
