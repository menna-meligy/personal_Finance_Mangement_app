import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import image1 from "../MyImages/0d554105596e6a478e05646c7740765d.jpg";
import image2 from "../MyImages/3a072f48d242fdda0a60d66d7f7d52fd.jpg";
import image3 from "../MyImages/3c72f6a5a43faa91fde7d948f121b3cb--crop-blouse-collar-blouse.jpg";
import image4 from "../MyImages/06f93268f4afc0bfde73b77a558ac8bc.jpg";
import image5 from "../MyImages/20b28d9a86b5aceef086d5a5d3d9b4d8.jpg";
import image6 from "../MyImages/48af658fc5e34405d008e6871eee916f.jpg";
import image7 from "../MyImages/a11abb0257bb7a8b5a4e768986807d5a.jpg";
import image8 from "../MyImages/Capture.PNG";
import image9 from "../MyImages/e3bb61542371100673ae4d4d0fc745e0.jpg";
import image10 from "../MyImages/f9846d77d90764c84529bac5503d7240.jpg";
import image11 from "../MyImages/k.jpg";
import image12 from "../MyImages/ll.PNG";
import image13 from "../MyImages/lll.PNG";

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
];

function Suggestions() {
  const [queryImage, setQueryImage] = useState(null);
  const [queryPath, setQueryPath] = useState(null);
  const [scores, setScores] = useState([]);
  const [imageDatails, setImageDatails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  // const [selectedItemDetails1, setSelectedItemDetails1] = useState({
  //   storeName: "",
  //   price: "",
  //   category: "",
  //   description: "",
  // });
  // const [selectedItemDetails2, setSelectedItemDetails2] = useState({
  //   storeName: "",
  //   price: "",
  //   category: "",
  //   description: "",
  // });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState({
    storeName: "",
    price: "",
    category: "",
    description: "",
  });

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   setQueryImage(file);
  //   setQueryPath(URL.createObjectURL(file));
  // };
  const handleImageUpload = (event) => {
    // Get the uploaded file
    const file = event.target.files[0];

    // Display the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setQueryPath(reader.result);
    };
    reader.readAsDataURL(file);
    setQueryImage(file);
    setQueryPath(URL.createObjectURL(file));
    // Set the selected image as the uploaded image
    setSelectedImage(file);
  };

  const extractImageName = (path) => {
    const splitPath = path.split("\\");
    const imageNameWithExtension = splitPath[splitPath.length - 1];
    const imageName = imageNameWithExtension.split("/").pop();
    return imageName;
  };

  function trimImageName(imagePath) {
    const imageName = imagePath.split("/").pop();
    const match = imageName.match(/image(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1]);
    }
    return null; // Return null if no number is found
  }
  const getImagePath = (imageName) => {
    return `../MyImages/${imageName}`;
  };
  let image;
  const handleShowDetails = async (id) => {
    if (selectedItem === id) {
      // If the selected item is already shown, toggle it off
      setSelectedItem(null);
      setSelectedItemDetails({});
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/items/${id}`
        );
        const details = response.data;
        setSelectedItemDetails(details);
        setSelectedItem(id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the query image to it
    const formData = new FormData();
    formData.append("query_img", queryImage);

    try {
      // Send a POST request to the Flask server
      const response = await axios.post(
        "http://192.168.51.125:5000//api/search",

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
    text-align: center;
  `;

  const UploadedImage = styled.img`
    border: 2px solid darkblue;
    margin-bottom: 20px;
  `;

  const BlueButton = styled.button`
    background-color: grey;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #999999;
    }
  `;

  const DetailsBox = styled.div`
    background-color: transparent;
    color: darkergrey;
    padding: 10px;
    margin-top: 10px;
    text-align: left;
    border: 1px solid darkgrey;
    border-radius: 10px;
    padding: 20px;
    font-size: 17px;
  `;
  const ResultFigure = styled.figure`
    display: inline-block;
    text-align: center;
    margin-right: 20px;
    margin-bottom: 20px;
  `;
  const ShowDetailsButton = styled(BlueButton)`
    margin-bottom: 0;
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const FileInput = styled.input`
    display: none;
  `;

  const ChooseFileButton = styled.label`
    background-color: #82c7ff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #62a7d9;
    }
  `;

  const SubmitButton = styled.input`
    background-color: #1a4785;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;
    &:hover {
      background-color: #62a7d9;
    }
  `;
  const FileInputWrapper = styled.label`
    background-color: #1a4785;
    margin-top: 20px;

    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #62a7d9;
    }
  `;

  const ResultsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;

  const ResultItem = styled.div`
    margin-bottom: 20px;
    text-align: center;
  `;

  const getImageVariable = (imagePath) => {
    if (imagePath === "../MyImages/0d554105596e6a478e05646c7740765d.jpg") {
      return "image1";
    } else if (
      imagePath === "../MyImages/06f93268f4afc0bfde73b77a558ac8bc.jpg"
    ) {
      return "image2";
    } else if (
      imagePath === "../MyImages/20b28d9a86b5aceef086d5a5d3d9b4d8.jpg"
    ) {
      return "image3";
    } else if (
      imagePath === "../MyImages/3a072f48d242fdda0a60d66d7f7d52fd.jpg"
    ) {
      return "image4";
    } else if (
      imagePath ===
      "../MyImages/3c72f6a5a43faa91fde7d948f121b3cb--crop-blouse-collar-blouse.jpg"
    ) {
      return "image5";
    } else if (
      imagePath === "../MyImages/48af658fc5e34405d008e6871eee916f.jpg"
    ) {
      return "image6";
    } else if (
      imagePath === "../MyImages/a11abb0257bb7a8b5a4e768986807d5a.jpg"
    ) {
      return "image7";
    } else if (imagePath === "../MyImages/Capture.PNG") {
      return "image8";
    } else if (
      imagePath === "../MyImages/e3bb61542371100673ae4d4d0fc745e0.jpg"
    ) {
      return "image9";
    } else if (
      imagePath === "../MyImages/f9846d77d90764c84529bac5503d7240.jpg"
    ) {
      return "image10";
    } else if (imagePath === "../MyImages/k.jpg") {
      return "image11";
    } else if (imagePath === "../MyImages/ll.PNG") {
      return "image12";
    } else if (imagePath === "../MyImages/lll.PNG") {
      return "image13";
    }

    return null; // Return null if no match found
  };

  return (
    <Container>
      <UploadedImage
        src="../MyImages/0d554105596e6a478e05646c7740765d.jpg"
        alt=""
      />
      <h1> Product Image Search Engine</h1>
      <Form onSubmit={handleSubmit}>
        <FileInputWrapper>
          Choose File
          <FileInput
            type="file"
            name="query_img"
            onChange={handleImageUpload}
          />
        </FileInputWrapper>
        <br />
        <SubmitButton type="submit" value="Submit" />
      </Form>
      {/* <h2>Query:</h2> */}
      {queryPath && (
        <img
          src={queryPath}
          width="300px"
          alt="Query"
          style={selectedImage ? { border: "2px solid red" } : {}}
        />
      )}{" "}
      <h2 style={{ marginTop: "7px", marginBottom: "6px" }}>Results</h2>
      <ResultsContainer>
        {scores.slice(1, 4).map((score, index) => {
          const imagePath = getImagePath(extractImageName(score[1]));
          const imageVariable = getImageVariable(imagePath);
          image = imageVariable;

          if (
            imagePath === "../MyImages/0d554105596e6a478e05646c7740765d.jpg"
          ) {
            image = image1;
          } else if (
            imagePath === "../MyImages/06f93268f4afc0bfde73b77a558ac8bc.jpg"
          ) {
            image = image2;
          } else if (
            imagePath === "../MyImages/20b28d9a86b5aceef086d5a5d3d9b4d8.jpg"
          ) {
            image = image2;
          } else if (
            imagePath === "../MyImages/3a072f48d242fdda0a60d66d7f7d52fd.jpg"
          ) {
            image = image3;
          } else if (
            imagePath ===
            "../MyImages/3c72f6a5a43faa91fde7d948f121b3cb--crop-blouse-collar-blouse.jpg"
          ) {
            image = image4;
          } else if (
            imagePath === "../MyImages/48af658fc5e34405d008e6871eee916f.jpg"
          ) {
            image = image6;
          } else if (
            imagePath === "../MyImages/a11abb0257bb7a8b5a4e768986807d5a.jpg"
          ) {
            image = image7;
          } else if (imagePath === "../MyImages/Capture.PNG") {
            image = image8;
          } else if (
            imagePath === "../MyImages/e3bb61542371100673ae4d4d0fc745e0.jpg"
          ) {
            image = image9;
          } else if (
            imagePath === "../MyImages/f9846d77d90764c84529bac5503d7240.jpg"
          ) {
            image = image10;
          } else if (imagePath === "../MyImages/k.jpg") {
            image = image11;
          } else if (imagePath === "../MyImages/ll.PNG") {
            image = image12;
          } else if (imagePath === "../MyImages/lll.PNG") {
            image = image13;
          }

          let imageId = trimImageName(image);
          //show details of images
          const showDetailsOfImage = async (id, count) => {
            try {
              const response = await axios.get(
                `http://localhost:3000/api/v1/items/${id}`
              );
              const datails = response.data;

              setImageDatails(datails);

              console.log(imageDatails);
              // Save the response data in state or handle it as needed
            } catch (error) {
              // Handle the error
              console.error("Error:", error);
            }
          };

          return (
            <ResultItem
              key={index}
              style={{
                float: "left",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              <img src={image} height="240px" alt={`Result ${index + 1}`} />
              {/* Rest of the code... */}
              <ShowDetailsButton
                onClick={() => handleShowDetails(trimImageName(imageVariable))}
              >
                {selectedItem === trimImageName(imageVariable)
                  ? "Less"
                  : "Show Details"}
              </ShowDetailsButton>

              {selectedItem === trimImageName(imageVariable) && (
                <DetailsBox>
                  <div>Store Name : {selectedItemDetails.storeName}</div>
                  <div>
                    Price
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    {selectedItemDetails.price}
                  </div>
                  <div>
                    Category&nbsp;&nbsp;&nbsp;&nbsp; :
                    {selectedItemDetails.category}
                  </div>
                  <div>
                    Description&nbsp;&nbsp;: {selectedItemDetails.description}
                  </div>
                </DetailsBox>
              )}
            </ResultItem>
          );
        })}
      </ResultsContainer>
    </Container>
  );
}

export default Suggestions;
