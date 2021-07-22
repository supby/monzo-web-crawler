import { URL } from 'url';
import { IContentDownloader } from "./contentDownloader";
import { HTMLLink, IContentParser } from "./contentParser";

export type CrawlerOptions = {
    startUrl: string;
}

export interface ICrawler {
    crawl(): Promise<void>;
}

export class Crawler implements ICrawler {
    private _contentDownloader: IContentDownloader;
    private _contentParser: IContentParser;
    private _options: CrawlerOptions;
    private _baseHostname: string;

    constructor(
        options: CrawlerOptions,
        contentDownloader: IContentDownloader, 
        contentParser: IContentParser) {
        this._options = options;
        this._contentDownloader = contentDownloader;
        this._contentParser = contentParser;

        this._baseHostname = new URL(options.startUrl).hostname;
    }

    async crawl(): Promise<void> {
        const visitedUrls = new Set<string>();
        await this._crawl(this._options.startUrl, visitedUrls);
    }

    private async _crawl(url: string, visitedUrls: Set<string>): Promise<void> {
        if (visitedUrls.has(url)) return;
        
        console.log('\x1b[32m%s\x1b[0m', `Visiting URL: '${url}'`);

        visitedUrls.add(url);

        const content = await this._contentDownloader.getContent(url);
        const links = await this._contentParser.getLinks(content);
        this._printLinks(links);

        (await this._contentParser.getURLs(content))
            .filter(u => new URL(u).hostname == this._baseHostname)
            .forEach(u => this._crawl(u, visitedUrls))
    }

    private _printLinks(links: HTMLLink[]): void {
        if (!links || links.length == 0) {
            console.log('No links on the page.');
            return;
        }

        console.log('Links:')
        for (const link of links) {
            console.log(link);
        }
    }
}