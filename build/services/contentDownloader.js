"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDownloader = void 0;
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
class ContentDownloader {
    getContent(url) {
        return new Promise((resolve, reject) => {
            const protocol = new URL(url).protocol;
            if (protocol.includes('https')) {
                https_1.default.get(url, (res) => this._handleResponse(resolve, res)).on('error', (e) => reject(e.message));
            }
            else if (protocol.includes('http')) {
                http_1.default.get(url, (res) => this._handleResponse(resolve, res)).on('error', (e) => reject(e.message));
            }
        });
    }
    _handleResponse(resolve, res) {
        const { statusCode } = res;
        if (statusCode !== 200) {
            resolve('');
            return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => resolve(rawData));
    }
}
exports.ContentDownloader = ContentDownloader;
