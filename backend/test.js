import { scrapeAmazonProductList } from "./scraper.js";

async function testScrape() {
    const keyword = "laptop";
    const products = await scrapeAmazonProductList(keyword);
    console.log("Scraped Products:", products);
}

testScrape();