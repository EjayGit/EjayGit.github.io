import { API_KEY } from "./config.js";

const endpoint = `https://content.guardianapis.com/search?q=cybersecurity&api-key=${API_KEY}&show-fields=headline,trailText&order-by=newest&page-size=3`;

async function fetchTopCyberNews() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Guardian API error: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.response.results;

    console.log("Top 3 Cybersecurity Headlines from The Guardian:\n");
    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.fields.headline}`);
      console.log(`   ${article.fields.trailText}`);
      console.log(`   Link: ${article.webUrl}\n`);
    });
  } catch (error) {
    console.error("Error fetching cybersecurity news:", error);
  }
}

fetchTopCyberNews();
