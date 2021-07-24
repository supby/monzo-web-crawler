import { parse, HTMLElement } from 'node-html-parser';

export type HTMLLink = {
    text: string;
    url: string;
}

export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(baseURL: string, content: string): Promise<string[]>;
}

export class ContentParser implements IContentParser {
    private urlRegexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    getLinks(content: string): Promise<HTMLLink[]> {
        return new Promise((resolve, reject) => { 
            const doc = parse(content);
            const links = doc.querySelectorAll('a')
                .map(link => ({ text: link.text.trim(), url: link.getAttribute('href') || '' }));
            resolve(links);
        });
    }

    async getURLs(baseURL: string, content: string): Promise<string[]> {
        const textUrls = await this._getTextURLs(content);
        const links = await this.getLinks(content);

        const res = links
            .map(l => new URL(l.url, baseURL).href)
            .concat(textUrls);

        return res;
    }

    private _getTextURLs(content: string): Promise<string[]> {
        return new Promise((resolve, reject) => { 
            const matches = content.match(this.urlRegexp);
            if (!matches) {
                resolve([])
                return;
            }

            resolve(matches)
        });
    }

}