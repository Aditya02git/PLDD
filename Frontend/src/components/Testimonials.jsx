import { useState, useEffect } from "react";

const API_KEY = "AIzaSyBPgDAssGaJDSmBkPhMWLFJvjpq9jBgGrA";
const prompt =
  "Discuss the current affairs related to plant and livestock diseases to the point?";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const data = await response.json();

        console.log("API Response:", data); // Debugging Line

        const newsText =
          data?.candidates?.[0]?.content?.parts
            ?.map((part) => part.text)
            .join(" ") || "No data available.";
        setNews(newsText.split("\n\n"));
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-gray-200 dark:bg-slate-800 min-h-screen">
      <h1 className="text-black dark:text-white text-2xl font-bold mb-4">
        📌Current Affairs(Latest News):
      </h1>
      {loading && <p>Loading latest updates...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news
          .filter(
            (item, index) => item.length >= 150 && index !== news.length - 1
          ) // Hide items with < 30 chars & last item
          .map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-white p-4 rounded-lg shadow"
            >
              <p className="text-black dark:text-black">{item}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
