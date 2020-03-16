import React, {Component, Fragment} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import DropBoxSaver from "./DropBoxSaver";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

class Saver extends Component {
    constructor(props) {
        super(props);

        this.ui = props.ui;
        this.extensionConfig = JSON.parse(this.ui.extension.config);

        this.state = {
            files: [],
            uploadFiles: [],
            open: false,
            message: 'hello dropbox',
            severity: 'success'
        };

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        // this.deleteFile = this.deleteFile.bind(this);
    }

    handleChange(files) {
        console.log('handle change');
        console.log(files);
        this.setState({
            files: files, uploadFiles: []
        });
        files.map((file, id) => {
            this.getBase64(file).then(fileUrl => this.setState(state => {
                const uploadFiles = state.uploadFiles.concat({'url': fileUrl, 'filename': file.name});
                return {
                    uploadFiles
                };
            }));
        });
        console.log('uploaded');
        console.log(this.state.uploadFiles);
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
    };

    onError(message){
        this.setState({open: true, message: message, severity: 'error'})
    }

    onSuccess(message){
        this.setState({open: true, message: message, severity: 'success'})
        //clear uploaded files
        this.setState({files: [], uploadFiles:[]});
    }

    render() {
        const {open} = this.state || false;
        const {severity} = this.state || 'success';
        const {message} = this.state || 'Hello dropbox';
        return (
            <Fragment>
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
                <DropBoxSaver files={this.state.uploadFiles}
                              error={() =>this.onError('Error uploading')}
                              appKey={this.extensionConfig.API_KEY}
                              success={() => this.onSuccess('Success! Files saved to your Dropbox.')}
                              cancel={() => console.log('closed')}>
                    <DropzoneArea onChange={this.handleChange.bind(this)} />
                </DropBoxSaver>

            </Fragment>
        )
    }


}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Saver;