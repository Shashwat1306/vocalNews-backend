import axios from 'axios';

export const fetchLatestNews = async () => {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    
    if (!NEWS_API_KEY) {
        throw new Error('NEWS_API_KEY is not configured in environment variables');
    }
    
    const url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${NEWS_API_KEY}`;
    
    try {
        const response = await axios.get(url);
        
        if (!response.data.articles || response.data.articles.length === 0) {
            throw new Error('No articles found in the news API response');
        }
        
        const article = response.data.articles[0];
        
        if (!article.title && !article.description) {
            throw new Error('Article has no title or description');
        }
        
        return {
            title: article.title || 'No title available',
            description: article.description || 'No description available',
            content: article.content || 'No content available',
        };
    } catch (error) {
        console.error('Error fetching latest news:', error.response?.data || error.message);
        throw error;
    }
};