import { ContentDownloader } from "./services/contentDownloader";
import { ContentParser } from "./services/contentParser";
import { Crawler } from "./services/crawler";

const downloader = new ContentDownloader();
const paerser = new ContentParser({
    baseHostname: 'monzo.com',
    baseProtocol: 'https'
});
const crawler = new Crawler({
    startUrl: 'https://monzo.com'
}, downloader, paerser);

crawler.crawl();

