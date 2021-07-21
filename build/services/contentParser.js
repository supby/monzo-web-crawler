"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentParser = void 0;
const node_html_parser_1 = require("node-html-parser");
class ContentParser {
    constructor(content) {
        this.doc = node_html_parser_1.parse(content);
    }
    getLinks() {
        return new Promise((resolve, reject) => {
            const links = this.doc.querySelectorAll('a').map(link => ({ text: link.text, url: link.getAttribute('href') || '' }));
            resolve(links);
        });
    }
    getURLs(content) {
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
