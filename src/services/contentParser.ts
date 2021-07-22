import { parse, HTMLElement } from 'node-html-parser';

export type HTMLLink = {
    text: string;
    url: string;
}

export type ContentParserOptions = {
    baseHostname: string;
    baseProtocol: string;
}

export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
}

export class ContentParser implements IContentParser {
    private _options: ContentParserOptions;

    constructor(options: ContentParserOptions) {
        this._options = options;
    }

    getLinks(content: string): Promise<HTMLLink[]> {
        return new Promise((resolve, reject) => { 
            const doc = parse(content);
            const links = doc.querySelectorAll('a')
                .map(link => ({ text: link.text.trim(), url: link.getAttribute('href') || '' }));
            resolve(links);
        });
    }

    async getURLs(content: string): Promise<string[]> {
        const textUrls = await this._getTextURLs(content);
        const links = await this.getLinks(content);

        return links
        .filter(l => !this.isURL(l.url))
        .map(l => {
            return `${this._options.baseProtocol}://${this._options.baseHostname}${l.url}`;
        }).concat(textUrls);
    }

    private isURL(url: string) {
        const regexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return (url.match(regexp) || []).length > 0;
    }

    private _getTextURLs(content: string): Promise<string[]> {
        const regexp = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return new Promise((resolve, reject) => { 
            const matches = content.match(regexp);
            if (!matches) {
                resolve([])
                return;
            }

            resolve(matches)
        });
    }

}