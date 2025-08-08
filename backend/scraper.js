import axios from "axios";
import { JSDOM } from "jsdom";

export async function scrapeAmazonProductList(keyword) {
    try {
        const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        console.log(`Scraping URL: ${amazonUrl}`);
        // Make a GET request to the Amazon search page
        let response = await axios.get(amazonUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
            },
            timeout: 5000,
        });
        console.log(`Response received: ${response.data.length} bytes`);

        // Parse the HTML response using JSDOM
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Select product elements
        const productSelector = '[data-component-type="s-search-result"]';
        const productElements = document.querySelectorAll(productSelector);

        if (productElements.length > 0) {
            console.log(`Found ${productElements.length} products`);
        }
        else {
            console.log("No products found.");
        }

        const products = [];

        // Extract product details
        productElements.forEach((element, index) => {
            try {
                const product = extractProductDetails(element, index);
                if (product) {
                    products.push(product);
                }
            } catch (error) {
                console.error(`Error extracting product details for element ${index}:`, error.message);
            }
        });

        console.log(`Extracted ${products.length} products`);
        return products;
    } catch (error) {
        console.error('Scraping failed:', error.message);
        return [];
    }
}

function extractProductDetails(element, index) {
    const titleSelector = 'h2 a span';
    const ratingSelector = '.a-icon-alt';
    const reviewSelector = '.a-size-base';
    const imageSelector = '.s-image';

    const titleElement = element.querySelector(titleSelector);
    const ratingElement = element.querySelector(ratingSelector);
    const reviewElement = element.querySelector(reviewSelector);
    const imageElement = element.querySelector(imageSelector);

    const title = titleElement?.textContent.trim() || "N/A";
    const rating = ratingElement?.textContent.trim() || "N/A";
    const reviewCount = reviewElement?.textContent.trim() || "N/A";
    const imageUrl = imageElement?.getAttribute("src")?.trim() || "N/A";

    console.log(`✅ Product ${index + 1}: ${title.substring(0, 50)}...`);

    return {
        id: index + 1,
        title,
        rating,
        reviewCount,
        imageUrl,
    };
}