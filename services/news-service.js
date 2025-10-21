import axios from 'axios';

export const fetchLatestNews = async (category = 'technology') => {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    
    if (!NEWS_API_KEY) {
        throw new Error('NEWS_API_KEY is not configured in environment variables');
    }
    
    // Use top-headlines endpoint with category for better results
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${NEWS_API_KEY}`;
    
    try {
        const response = await axios.get(url);
        const articles = response.data.articles;
        
        if (!articles || articles.length === 0) {
            throw new Error(`No articles found for category: ${category}`);
        }

        // Get a random article from the results
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        
        return {
            title: article.title || 'No title available',
            description: article.description || 'No description available',
            content: article.content || 'No content available',
            category: category,
        };
    } catch (error) {
        console.error('Error fetching latest news:', error.response?.data || error.message);
        throw error;
    }
};