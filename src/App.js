import React, { useState } from "react";
import "./App.css";
function App() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState({}); 
  const generateShortUrl = () => {
    if (!url) return;
    const shortCode = Math.random().toString(36).substring(2, 8); 
    setShortUrls({
      ...shortUrls,
      [shortCode]: { longUrl: url, clicks: 0 },
    });
    setUrl("");
  };
  const handleClick = (code) => {
    const entry = shortUrls[code];
    if (entry) {
      window.open(entry.longUrl, "_blank"); 
      setShortUrls({
        ...shortUrls,
        [code]: { ...entry, clicks: entry.clicks + 1 },
      });
    }
  };
  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={generateShortUrl}>Shorten</button>
      </div>
      <h2>Your Shortened URLs</h2>
      {Object.keys(shortUrls).length === 0 ? (
        <p>No URLs shortened yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shortUrls).map(([code, data]) => (
              <tr key={code}>
                <td>
                  <button
                    className="link-btn"
                    onClick={() => handleClick(code)}
                  >
                    {window.location.origin}/{code}
                  </button>
                </td>
                <td className="long-url">{data.longUrl}</td>
                <td>{data.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default App;
