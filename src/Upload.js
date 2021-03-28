import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FileBase64 from "react-file-base64";
import "./Upload.css";
export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      result: [],
      ifPerson: "",
    };

    this.fileUpload = this.fileUpload.bind(this);
  }

  getFiles(files) {
    this.setState({
      files: files,
    });

    console.log(this.state.files);
  }

  async fileUpload() {
    const photo = this.state.files["base64"];
    const base64OfImage = photo.split(",")[1];
    const response = await fetch(
      "https://6tux3pbm47.execute-api.us-east-1.amazonaws.com/Prod/passportphoto",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ photo: base64OfImage }),
      }
    );

    const result = await response.json();
    this.setState({ result: result.body });

    const face_details = JSON.parse(this.state.result);

    if (face_details["FaceDetails"][0] === undefined) {
      this.setState({
        ifPerson: "Sorry, Looks like you just uploaded an invalid photo!",
      });
    } else {
      this.setState({ ifPerson: "Thanks for uploading your photo!" });
    }
  }
  render() {
    const ifPerson = this.state.ifPerson;
    return (
      <div>
        <div className="row">
          <div className="col-6 offset-3">
            <h4>Passport Photo Validator</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3 files">
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            <img src={this.state.files.base64} width="40%" />
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            <strong>{ifPerson}</strong>
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            <Button
              className="btn btn-lg btn-danger btn-block"
              onClick={this.fileUpload}
            >
              Verify Photo
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
