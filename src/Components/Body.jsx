import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Body = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(''); // Default category

  // Fetch news API
  const fetchApi = async (category) => {
    try {
      const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
      console.log(import.meta.env.VITE_API_URL);
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: API_KEY,
          country: 'us', // Country code, can be modified
          category: category, // Use the selected category here
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchApi(category);
  }, [category]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="mb-6 text-center">
        <nav className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-6">
          {['General', 'Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded transition transform hover:scale-105 ${
                category === cat.toLowerCase() ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
              } border border-gray-700 shadow-sm hover:bg-gray-900 hover:text-white`}
              onClick={() => setCategory(cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src={article.urlToImage || '/img.jpg'} // Use default image if urlToImage is not available
                alt={article.title || 'Default image'}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No articles available.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
