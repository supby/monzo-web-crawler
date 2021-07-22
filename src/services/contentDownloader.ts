import http, { IncomingMessage } from 'http';
import https from 'https';

export interface IContentDownloader {
    getContent(url: string): Promise<string>;
}

export class ContentDownloader implements IContentDownloader {
    getContent(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const protocol = new URL(url).protocol;
            if (protocol.includes('https')) {
                https.get(url, (res: IncomingMessage) => this._handleResponse(resolve, res)).on('error', (e) => reject(e.message));
            }
            else if (protocol.includes('http')) {
                http.get(url, (res: IncomingMessage) => this._handleResponse(resolve, res)).on('error', (e) => reject(e.message));
            }
        });
    }

    private _handleResponse(resolve: any, res: IncomingMessage): void {
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