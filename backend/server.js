import express from 'express';
import cors from 'cors';
import { scrapeAmazonProductList } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 8080

// For the server, Im using a middleware
app.use(cors())
app.use(express.json())

// Cheking endpoint
app.get('/', (req, res) => {
    res.json({
        message: "API is running"
    })
    endpoints: {
        scrape: '/api/scrape?keyword=yourKeyword'
    }
})

//  Scraper Endpoint

app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;

    // Validating Parameter
    if (!keyword) {
        return res.status(400).json({
            error: "Missing Keyword Parameter",
            usage: '/api/scrape?keyword=yourKeyword'
        })
    }
    console.log(`Starting scrape for keyword: "${keyword}"`);
    try {
        // Call scraper function
        const products = await scrapeAmazonProductList(keyword);

        console.log(`✅ Successfully scraped ${products.length} products`);

        // Return results
        res.json({
            keyword,
            totalProducts: products.length,
            products,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Scraping error:', error.message);

        res.status(500).json({
            error: 'Failed to scrape Amazon products',
            message: error.message,
            keyword
        });
    }
})



// Starting Server
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});
