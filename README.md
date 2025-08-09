# Amazon Product Scraper

A full-stack web application that scrapes Amazon product listings based on search keywords. Built with Node.js/Express backend using Bun runtime and a vanilla JavaScript frontend with Vite.

## 🚀 Features

- Search Amazon products by keyword
- Extract product details including title, rating, reviews, and images
- Clean and responsive web interface
- RESTful API architecture
- Fast development with Vite and Bun

## 🛠️ Tech Stack

### Backend
- **Runtime:** Bun
- **Framework:** Express.js
- **Web Scraping:** Axios + JSDOM
- **CORS:** Enabled for frontend communication

### Frontend
- **Build Tool:** Vite
- **Language:** Vanilla JavaScript
- **Styling:** CSS3
- **HTTP Client:** Fetch API

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Joaogab777/Amazon-product-listings.git
cd amazon-product-listing
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
bun install
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
# or
yarn install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

From the `backend` directory:

```bash
bun run server.js
```

The backend server will start on `http://localhost:8080`

### Start the Frontend Development Server

From the `frontend` directory:

```bash
npm run dev
# or
yarn dev
```

The frontend will start on `http://localhost:5173` (or another available port)

### Accessing the Application

1. Open your browser and go to `http://localhost:5173`
2. Enter a keyword in the search box (e.g., "laptop", "headphones")
3. Click "Scrape" to fetch Amazon products
4. View the results with product details

## 📁 Project Structure

```
amazon-scraper/
├── backend/
│   ├── .gitignore
│   ├── bun.lock
│   ├── package.json
│   ├── tsconfig.json
│   ├── server.js          # Main server file
│   └── scraper.js         # Web scraping logic
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── src/
│       ├── main.js        # Frontend JavaScript
│       └── style.css      # Styling
└── README.md
```

## 🔧 API Endpoints

### GET `/`
- **Description:** Health check endpoint
- **Response:** API status and available endpoints

### GET `/api/scrape?keyword={keyword}`
- **Description:** Scrape Amazon products by keyword
- **Parameters:**
  - `keyword` (required): Search term for products
- **Response:**
  ```json
  {
    "keyword": "laptop",
    "totalProducts": 16,
    "products": [
      {
        "id": 1,
        "title": "Product Title",
        "rating": "4.5 out of 5 stars",
        "reviewCount": "1,234 reviews",
        "imageUrl": "https://..."
      }
    ],
    "timestamp": "2025-01-XX..."
  }
  ```

## 🛠️ Configuration

### Backend Configuration

The backend runs on port 8080 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=3000 bun run server.js
```

### Frontend Configuration

The frontend is configured to communicate with the backend at `http://localhost:8080`. If you change the backend port, update the fetch URL in `frontend/src/main.js`.

## 📝 Scripts

### Backend Scripts
```bash
bun run server.js    # Start the server
```

### Frontend Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🚨 Important Notes

### Rate Limiting & Respectful Scraping
- The scraper includes proper headers to appear as a regular browser request
- Implements a 5-second timeout to prevent hanging requests
- Please use responsibly and respect Amazon's robots.txt and terms of service

### CORS Configuration
- The backend has CORS enabled for development
- For production, configure CORS to only allow your frontend domain

### Error Handling
- The application includes comprehensive error handling for network issues
- Failed requests are logged to the console
- User-friendly error messages are displayed in the UI

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Ensure Bun is installed correctly
   - Check if port 8080 is available
   - Run `bun install` in the backend directory

2. **Frontend can't connect to backend:**
   - Verify backend is running on port 8080
   - Check for CORS issues in browser console
   - Ensure the API URL in `main.js` is correct

3. **No products found:**
   - Try different keywords
   - Check internet connection
   - Amazon may be blocking the request (try again later)

4. **Dependencies issues:**
   - Delete `node_modules` and `bun.lock`/`package-lock.json`
   - Reinstall dependencies

## 📄 License

This project is for educational purposes. Please ensure you comply with Amazon's terms of service and robots.txt when using this scraper.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Disclaimer:** This tool is for educational and personal use only. Always respect website terms of service and implement appropriate rate limiting when scraping websites.