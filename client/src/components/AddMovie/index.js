// components/AddMovie/index.jsx

import React, { Component } from 'react';

// import the service file since we need it to send (and get) the data to(from) the server
import service from '../../api/service';

class AddMovie extends Component {
  state = {
    title: '',
    description: '',
    imageUrl: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // ******** this method handles just the file upload ********
  handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imageUrl', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => console.log('Error while uploading the file: ', err));
  };

  // this method submits the form
  handleSubmit = e => {
    e.preventDefault();

    service
      .saveNewMovie(this.state)
      .then(res => {
        console.log('added new movie: ', res);
        // here you would redirect to some other page
      })
      .catch(err => console.log('Error while adding the new movie: ', err));
  };

  render() {
    return (
      <div>
        <h2>New Movie</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label>

          <label>Description</label>
          <textarea type="text" name="description" value={this.state.description} onChange={this.handleChange} />

          <input type="file" onChange={this.handleFileUpload} />

          <button type="submit">Save new movie</button>
        </form>
      </div>
    );
  }
}

export default AddMovie;
