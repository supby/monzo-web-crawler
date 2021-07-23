import { URL } from 'url';
import { IContentDownloader } from "./contentDownloader";
import { HTMLLink, IContentParser } from "./contentParser";

export type CrawlerOptions = {
    startUrl: string;
}

export interface ICrawler {
    crawl(): Promise<CrawlerURLResult[]>;
}

export type CrawlerURLResult = {
    url: string;
    links: HTMLLink[];
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

    async crawl(): Promise<CrawlerURLResult[]> {
        const visitedUrls = new Set<string>();
        const res: CrawlerURLResult[] = [];
        await this._crawl(this._options.startUrl, visitedUrls, res);
        console.log(`res.length: ${res.length}`);
        return res;
    }

    private async _crawl(url: string, visitedUrls: Set<string>, res: CrawlerURLResult[]): Promise<void> {
        if (visitedUrls.has(url)) return;

        visitedUrls.add(url);

        const content = await this._contentDownloader.getContent(url);
        const links = await this._contentParser.getLinks(content);
        
        res.push({ url, links});
        console.log('\x1b[32m%s\x1b[0m', `Visited INSIDE URL: '${url}'`);
        //console.log(`res.length: '${res.length}'`);

        const baseURLObj = new URL(url);
        (await this._contentParser.getURLs(`${baseURLObj.protocol}//${baseURLObj.hostname}`, content))
            .filter(u => new URL(u).hostname == this._baseHostname)
            .forEach(async u => await this._crawl(u, visitedUrls, res))
    }
}