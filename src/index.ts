import { ContentDownloader } from "./services/contentDownloader";
import { ContentParser } from "./services/contentParser";
import { Crawler, CrawlerURLResult } from "./services/crawler";

const downloader = new ContentDownloader();
const paerser = new ContentParser();
const crawler = new Crawler({
    startUrl: 'https://monzo.com'
}, downloader, paerser);

crawler.crawl().then(data => printData(data));

function printData(data: CrawlerURLResult[]) {
    console.log('======= Result ======');
    for (const urlData of data) {
        console.log('\x1b[32m%s\x1b[0m', `Visited URL: '${urlData.url}'`);
        for (const link of urlData.links) {
            console.log(`Link: Text='${link.text}', URL='${link.url}'`);
        }
    }
}