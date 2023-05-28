import React, { useState } from "react";
import axios from "axios";

function Suggestions() {
  const [queryImage, setQueryImage] = useState(null);
  const [queryPath, setQueryPath] = useState(null);
  const [scores, setScores] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setQueryImage(file);
    setQueryPath(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the query image to it
    const formData = new FormData();
    formData.append("query_img", queryImage);

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(
        "http://192.168.50.104:5000/api/search",
        formData
      );

      // Update the scores state with the received results
      setScores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Insert picture of the item here</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="query_img" onChange={handleImageUpload} />
        <br />
        <input type="submit" />
      </form>
      <h2>Query:</h2>
      {queryPath && <img src={queryPath} width="300px" alt="Query" />}
      <h2>Results:</h2>
      {scores.length > 0 ? (
        scores.map((score, index) => (
          <figure
            key={index}
            style={{ float: "left", marginRight: "20px", marginBottom: "20px" }}
          >
            <img src={score[1]} height="200px" alt={`Result ${index + 1}`} />
            <figcaption>{score[0]}</figcaption>
          </figure>
        ))
      ) : (
        <p>No results to display</p>
      )}
    </div>
  );
}

export default Suggestions;
