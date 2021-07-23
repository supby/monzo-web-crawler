export declare type HTMLLink = {
    text: string;
    url: string;
};
export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(baseURL: string, content: string): Promise<string[]>;
}
export declare class ContentParser implements IContentParser {
    private urlRegexp;
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(baseURL: string, content: string): Promise<string[]>;
    private _getTextURLs;
}
//# sourceMappingURL=contentParser.d.ts.map