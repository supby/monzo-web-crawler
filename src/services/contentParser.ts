import { parse, HTMLElement } from 'node-html-parser';

export type HTMLLink = {
    text: string;
    url: string;
}

export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
}

export class ContentParser implements IContentParser {
    doc: HTMLElement;

    constructor(content: string) {
        this.doc = parse(content);
    }

    getLinks(): Promise<HTMLLink[]> {
        
        return new Promise((resolve, reject) => { 

            const links = this.doc.querySelectorAll('a').map(link => ({ text: link.text, url: link.getAttribute('href') || '' }));
            resolve(links)

        });
    }

    getURLs(content: string): Promise<string[]> {
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