import http, { IncomingMessage } from 'http';
import https from 'https';

export interface IContentDownloader {
    getContent(url: string): Promise<string>;
}

export class ContentDownloader implements IContentDownloader {
    getContent(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            https.get(url, (res: IncomingMessage) => {
                const { statusCode } = res;
                if (statusCode !== 200) return '';

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => resolve(rawData));
            }).on('error', (e) => reject(e.message));
        })        
    }
}