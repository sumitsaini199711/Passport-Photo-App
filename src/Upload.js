import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FileBase64 from "react-file-base64";
import "./Upload.css";
export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
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
    const response = await fetch(
      "https://6tux3pbm47.execute-api.us-east-1.amazonaws.com/Prod/passportphoto",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state.files),
      }
    );

    console.log(response);
  }
  render() {
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
