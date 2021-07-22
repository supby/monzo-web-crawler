export interface IContentDownloader {
    getContent(url: string): Promise<string>;
}
export declare class ContentDownloader implements IContentDownloader {
    getContent(url: string): Promise<string>;
    private _handleResponse;
}
//# sourceMappingURL=contentDownloader.d.ts.map