import { IContentDownloader } from "./contentDownloader";
import { IContentParser } from "./contentParser";
export declare type CrawlerOptions = {
    startUrl: string;
};
export interface ICrawler {
    crawl(): Promise<void>;
}
export declare class Crawler implements ICrawler {
    private _contentDownloader;
    private _contentParser;
    private _options;
    private _baseHostname;
    constructor(options: CrawlerOptions, contentDownloader: IContentDownloader, contentParser: IContentParser);
    crawl(): Promise<void>;
    private _crawl;
    private _printLinks;
}
//# sourceMappingURL=crawler.d.ts.map