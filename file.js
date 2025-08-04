// Using your provided API endpoint
const apiUrl = 'https://content.guardianapis.com/search?q=cyber&api-key=a43ff090-180e-4fb9-beca-b834bdf860c0&show-fields=trailText&page-size=3&order-by=newest';

async function fetchCyberNews() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Process and display the first 3 results
    const newsContainer = document.getElementById('news-results');
    newsContainer.innerHTML = ''; // Clear loading message
    
    data.response.results.slice(0, 3).forEach(article => {
      const articleDate = new Date(article.webPublicationDate).toLocaleDateString();
      
      const articleElement = document.createElement('div');
      articleElement.className = 'news-article';
      articleElement.innerHTML = `
        <h3><a href="${article.webUrl}" target="_blank">${article.webTitle}</a></h3>
        <p class="news-date">${articleDate}</p>
        ${article.fields?.trailText ? `<p class="news-summary">${article.fields.trailText}</p>` : ''}
      `;
      newsContainer.appendChild(articleElement);
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    document.getElementById('news-results').innerHTML = `
      <p class="error-message">Failed to load news. Please try again later.</p>
      <p>Error: ${error.message}</p>
    `;
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchCyberNews);
