import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const post_array = [];
      post_array.push({
        "target": url,
        "max_crawl_pages": 10,
        "load_resources": true,
        "enable_javascript": true,
        "custom_js": "meta = {}; meta.url = document.URL; meta;",
        "tag": "some_string_123",
        "pingback_url": "https://your-server.com/pingscript?id=$id&tag=$tag"
      });

      const response = await axios({
        method: 'post',
        url: 'https://api.dataforseo.com/v3/on_page/task_post',
        auth: {
        username: 'kp5655918@gmail.com',
        password: 'bfae1207f002f3a9'
        },
        data: post_array,
        headers: {
          'content-type': 'application/json'
        }
      });

      setResults(response.data); // Update the state with the results
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Submit</button>
      </form>
      {results && (
        <div>
          <h2>Results</h2>
          {/* Render your results here */}
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;
