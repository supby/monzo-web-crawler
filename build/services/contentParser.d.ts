export declare type HTMLLink = {
    text: string;
    url: string;
};
export declare type ContentParserOptions = {
    baseHostname: string;
    baseProtocol: string;
};
export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
}
export declare class ContentParser implements IContentParser {
    private _options;
    constructor(options: ContentParserOptions);
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
    private isURL;
    private _getTextURLs;
}
//# sourceMappingURL=contentParser.d.ts.map