import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import FileBase64 from "react-file-base64";
export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  getFiles(files) {
    this.setState({
      files: files,
    });

    console.log(this.state.files);
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
          <div className="col-6 offset-3">
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            <h4>Passport Photo Validator</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
