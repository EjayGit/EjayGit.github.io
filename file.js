// guardian-top3-cyber-news.js
import { API_KEY } from "./config.js";

const endpoint = `https://content.guardianapis.com/search?q=cybersecurity&api-key=${API_KEY}&show-fields=headline,trailText&order-by=newest&page-size=3`;

async function fetchTopCyberNews() {
  const container = document.getElementById("news-results");
  container.innerHTML = "<p>Fetching latest headlines...</p>";

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Guardian API error: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.response.results;

    // Build HTML list
    const list = document.createElement("ul");
    articles.forEach(article => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${article.fields.headline}</strong><br>
        ${article.fields.trailText}<br>
        <a href="${article.webUrl}" target="_blank">Read more</a>
      `;
      list.appendChild(item);
    });

    container.innerHTML = ""; // Clear loading text
    container.appendChild(list);

  } catch (error) {
    container.innerHTML = `<p style="color:red;">Error fetching news: ${error.message}</p>`;
  }
}

fetchTopCyberNews();
