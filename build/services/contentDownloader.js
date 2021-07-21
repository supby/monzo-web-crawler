"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDownloader = void 0;
const tslib_1 = require("tslib");
const https_1 = tslib_1.__importDefault(require("https"));
class ContentDownloader {
    getContent(url) {
        return new Promise((resolve, reject) => {
            https_1.default.get(url, (res) => {
                const { statusCode } = res;
                if (statusCode !== 200)
                    return '';
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => resolve(rawData));
            }).on('error', (e) => reject(e.message));
        });
    }
}
exports.ContentDownloader = ContentDownloader;
