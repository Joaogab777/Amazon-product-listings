import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1 class="title">Amazon Product Scraper</h1>
    <div class="search-bar">
      <input id="keywordInput" type="text" placeholder="Enter keyword..." class="input" />
      <button id="scrapeBtn" class="button">Scrape</button>
    </div>
    <div id="results" class="results"></div>
  </div>
`

const scrapeBtn = document.getElementById('scrapeBtn');
const keywordInput = document.getElementById('keywordInput');
const resultsDiv = document.getElementById('results');

scrapeBtn.addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  resultsDiv.innerHTML = '';
  if (!keyword) {
    resultsDiv.innerHTML = `<div class="error">Please enter a keyword.</div>`;
    return;
  }
  scrapeBtn.disabled = true;
  scrapeBtn.textContent = 'Scraping...';
  try {
    const res = await fetch(`http://localhost:8080/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    if (data.error) {
      resultsDiv.innerHTML = `<div class="error">${data.error}</div>`;
    } else if (data.products && data.products.length > 0) {
      resultsDiv.innerHTML = `
        <h2 class="subtitle">Results for "${data.keyword}" (${data.totalProducts} products)</h2>
        <ul class="product-list">
          ${data.products.map(p => `
            <li class="product-item">
              <img src="${p.imageUrl || ''}" alt="Product Image" class="product-image" />
              <div class="product-info">
                <strong>${p.title || 'No Title'}</strong><br>
                <span>${p.rating ? `Rating: ${p.rating} ⭐` : 'Rating: N/A'}</span><br>
                <span>${p.reviews ? `Reviews: ${p.reviews}` : 'Reviews: N/A'}</span><br>
                <a href="${p.link}" target="_blank" class="product-link">View on Amazon</a>
              </div>
            </li>
          `).join('')}
        </ul>
      `;
    } else {
      resultsDiv.innerHTML = `<div>No products found.</div>`;
    }
  } catch (err) {
    resultsDiv.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
  scrapeBtn.disabled = false;
  scrapeBtn.textContent = 'Scrape';
});
