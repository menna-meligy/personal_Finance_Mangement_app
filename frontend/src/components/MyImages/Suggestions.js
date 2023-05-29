import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import image1 from "../MyImages/0d554105596e6a478e05646c7740765d.jpg";
import image2 from "../MyImages/06f93268f4afc0bfde73b77a558ac8bc.jpg";
import image3 from "../MyImages/0d554105596e6a478e05646c7740765d.jpg";
import image4 from "../MyImages/20b28d9a86b5aceef086d5a5d3d9b4d8.jpg";
import image5 from "../MyImages/3a072f48d242fdda0a60d66d7f7d52fd.jpg";
import image6 from "../MyImages/3c72f6a5a43faa91fde7d948f121b3cb--crop-blouse-collar-blouse.jpg";
import image7 from "../MyImages/48af658fc5e34405d008e6871eee916f.jpg";
import image8 from "../MyImages/a11abb0257bb7a8b5a4e768986807d5a.jpg";
import image9 from "../MyImages/Capture.PNG";
import image10 from "../MyImages/e3bb61542371100673ae4d4d0fc745e0.jpg";
import image11 from "../MyImages/f9846d77d90764c84529bac5503d7240.jpg";
import image12 from "../MyImages/k.jpg";
import image13 from "../MyImages/ll.PNG";
import image14 from "../MyImages/lll.PNG";

const imagePaths = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
];

function Suggestions() {
  const [queryImage, setQueryImage] = useState(null);
  const [queryPath, setQueryPath] = useState(null);
  const [scores, setScores] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setQueryImage(file);
    setQueryPath(URL.createObjectURL(file));
  };

  const extractImageName = (path) => {
    const splitPath = path.split("\\");
    const imageNameWithExtension = splitPath[splitPath.length - 1];
    const imageName = imageNameWithExtension.split("/").pop();
    return imageName;
  };

  const getImagePath = (imageName) => {
    return `../MyImages/${imageName}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the query image to it
    const formData = new FormData();
    formData.append("query_img", queryImage);

    try {
      // Send a POST request to the Flask server
      const response = await axios.post(
        "http://192.168.51.75:5000//api/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Allow sending cookies
          crossDomain: true, // Enable CORS
        }
      );
      // Update the state with the received results
      setScores(response.data);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `;
  return (
    <Container>
      <img src="../MyImages/0d554105596e6a478e05646c7740765d.jpg" alt="" />
      <h1> Product Image Search Engine</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="query_img" onChange={handleImageUpload} />
        <br />
        <input type="submit" />
      </form>
      <h2>Query:</h2>
      {queryPath && <img src={queryPath} width="300px" alt="Query" />}
      <h2>Results:</h2>
      {scores.slice(1, 4).map((score, index) => {
        const imagePath = getImagePath(extractImageName(score[1]));

        console.log("Image Name:", extractImageName(score[1]));
        console.log("Image Path:", imagePath);
        console.log("ss", score[1]);

        let image;
        if (imagePath === "../MyImages/0d554105596e6a478e05646c7740765d.jpg") {
          image = image1;
        } else if (
          imagePath === "../MyImages/06f93268f4afc0bfde73b77a558ac8bc.jpg"
        ) {
          image = image2;
        } else if (
          imagePath === "../MyImages/0d554105596e6a478e05646c7740765d.jpg"
        ) {
          image = image3;
        } else if (
          imagePath === "../MyImages/20b28d9a86b5aceef086d5a5d3d9b4d8.jpg"
        ) {
          image = image4;
        } else if (
          imagePath === "../MyImages/3a072f48d242fdda0a60d66d7f7d52fd.jpg"
        ) {
          image = image5;
        } else if (
          imagePath ===
          "../MyImages/3c72f6a5a43faa91fde7d948f121b3cb--crop-blouse-collar-blouse.jpg"
        ) {
          image = image6;
        } else if (
          imagePath === "../MyImages/48af658fc5e34405d008e6871eee916f.jpg"
        ) {
          image = image7;
        } else if (
          imagePath === "../MyImages/a11abb0257bb7a8b5a4e768986807d5a.jpg"
        ) {
          image = image8;
        } else if (imagePath === "../MyImages/Capture.PNG") {
          image = image9;
        } else if (
          imagePath === "../MyImages/e3bb61542371100673ae4d4d0fc745e0.jpg"
        ) {
          image = image10;
        } else if (
          imagePath === "../MyImages/f9846d77d90764c84529bac5503d7240.jpg"
        ) {
          image = image11;
        } else if (imagePath === "../MyImages/k.jpg") {
          image = image12;
        } else if (imagePath === "../MyImages/ll.PNG") {
          image = image13;
        } else if (imagePath === "../MyImages/lll.PNG") {
          image = image14;
        }

        return (
          <figure
            key={index}
            style={{
              float: "left",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            <img src={image} height="200px" alt={`Result ${index + 1}`} />
            {/* <figcaption>{score[0]}</figcaption> */}
          </figure>
        );
      })}
    </Container>
  );
}

export default Suggestions;
