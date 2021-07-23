import { IContentDownloader } from "./contentDownloader";
import { HTMLLink, IContentParser } from "./contentParser";
export declare type CrawlerOptions = {
    startUrl: string;
};
export interface ICrawler {
    crawl(): Promise<CrawlerURLResult[]>;
}
export declare type CrawlerURLResult = {
    url: string;
    links: HTMLLink[];
};
export declare class Crawler implements ICrawler {
    private _contentDownloader;
    private _contentParser;
    private _options;
    private _baseHostname;
    constructor(options: CrawlerOptions, contentDownloader: IContentDownloader, contentParser: IContentParser);
    crawl(): Promise<CrawlerURLResult[]>;
    private _crawl;
}
//# sourceMappingURL=crawler.d.ts.map