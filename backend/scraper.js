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
        // Find product containers (Amazon uses different selectors)
        const productSelector = '[data-component-type="s-search-result"]';
        let productElements = [];

        productElements = document.querySelectorAll(productSelector);

        if (productElements.length > 0) {
            console.log(`Found ${productElements.length} products`);
        }
        else {
            console.log("No products found.");
        }

        const products = []

        // Extract product details
        productElements.forEach((element, index) => {
            try {
                const product = extractProductDetails(element);

                if (product) {
                    products.push(product);
                }
            }
            catch (error) {
                console.error(`Error extracting product details for element ${index}:`, error.message);
            }
        });

        console.log(`extracted ${products.length} products`)
        return products;
    } catch (error) {
        console.error(' Scraping failed:', error.message);
        return [];
    }
    function extractProductDetails(element, index) {
        // Title selector
        function extractProductDetails(element, index) {
            // Title selector
            const titleSelector = 'h2 a span';

            // Rating selector 
            const ratingSelector = '.a-icon-alt';

            // Review count selector 
            const reviewSelector = '.a-size-base';

            // Image selector 
            const imageSelector = '.s-image';

            // Extract Details
            let title = "";
            let rating = "";
            let reviews = "";
            let image = "";

            const titleElement = element.querySelector(titleSelector);
            if (titleElement?.textContent?.trim()) {
                title = titleElement.textContent.trim();
            }

            const ratingElement = element.querySelector(ratingSelector);
            if (ratingElement?.textContent?.trim()) {
                rating = ratingElement.textContent.trim();
            }

            const reviewElement = element.querySelector(reviewSelector);
            if (reviewElement?.textContent?.trim()) {
                reviews = reviewElement.textContent.trim();
            }

            const imageElement = element.querySelector(imageSelector);
            if (imageElement?.getAttribute("src")) {
                image = imageElement.getAttribute("src").trim();
            }


            const product = {
                id: index + 1,
                title,
                rating: rating || 'N/A',
                reviewCount: reviewCount || 'N/A',
                imageUrl: imageUrl || 'N/A'
            };

            console.log(`✅ Product ${index + 1}: ${title.substring(0, 50)}...`);
            return product;
        }

    }
}