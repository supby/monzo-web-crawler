import { HTMLElement } from 'node-html-parser';
export declare type HTMLLink = {
    text: string;
    url: string;
};
export interface IContentParser {
    getLinks(content: string): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
}
export declare class ContentParser implements IContentParser {
    doc: HTMLElement;
    constructor(content: string);
    getLinks(): Promise<HTMLLink[]>;
    getURLs(content: string): Promise<string[]>;
}
//# sourceMappingURL=contentParser.d.ts.map