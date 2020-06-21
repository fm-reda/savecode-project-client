import axios from "axios";

import React, { Component } from "react";
import { Stack, Box } from "@chakra-ui/core";
import Axios from "axios";

class Uploader extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    file: null,
    image: "",
    items: [],
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    console.log(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
    // this.setState({ file: event.target.files[0] });

    // console.log(this.state.selectedFile);
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", this.state.selectedFile);

    console.log(this.state.selectedFile);
    console.log(formData);

    // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    const file = this.state.file;
    // console.log(file);
    axios.post("http://localhost:8000/api/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  download = () => {
    console.log("clicked");
    const urlD = `http://localhost:8000/api/photo`;
    Axios.get(urlD)
      .then((res) => {
        console.log(res.data.uri);

        // console.log(img64);

        this.setState({ items: res.data });
      })

      .catch((err) => {
        return err.response;
        console.log(err.response);
      });
  };

  render() {
    return (
      <Stack>
        <Box mt="120px">
          <div>
            <h1>GeeksforGeeks</h1>
            <h3>File Upload using React!</h3>
            <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>Upload!</button>
              <button onClick={this.download}>Show</button>
            </div>
            {this.fileData()}
            {this.state.items.map((item) => (
              <img
                key={item.id}
                width="500px"
                height="500px"
                src={`http://localhost:8000/storage/${item.uri}`}
                alt="Red dot"
              />
            ))}
          </div>
        </Box>
      </Stack>
    );
  }
}

export default Uploader;
