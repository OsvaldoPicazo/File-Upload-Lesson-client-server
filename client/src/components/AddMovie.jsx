// since we are using classes, we have to import react, function dont require react
import React, {Component} from 'react';

// import the service file since you need it to send and get the data from the server
import service from ".././api/service";

// type rcc to quickly get a class basic structure
class AddMovie extends Component {
    
    state={
        title: '',
        description: '',
        imageUrl: ''
    }

    // handle text inputs
    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({[name] : value})
    }

    // handle file upload
    handleFileUpload = (event) => {
        const uploadData = new FormData();

        uploadData.append('imageUrl', event.target.files[0])

        service
            .handleUpload(uploadData)
            .then(response => {
                console.log("response: ", response)
                this.setState({imageUrl: response.secure_url})
            })
            .catch(error => {
                console.log("error while uploading: ", error)
            })
    }

    handleSubmit = (event) => {
        // prevent the default behavior of submit button: reloading the page
        event.preventDefault()

        service
            .saveNewMovie(this.state)
            .then(response => {
                console.log('added new movie', response)
            })
            .catch(error => {
                console.log('error while adding', error)
            })
    }

    render () {
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
            

                    <p>Image Preview</p>
                    {this.state.imageUrl && <img src={this.state.imageUrl} alt="preview" />}

                    <input type="file" onChange={this.handleFileUpload} />
            
                    <button type="submit">Save new movie</button>
                </form>
          </div> 
        )
    }

}

export default AddMovie;


