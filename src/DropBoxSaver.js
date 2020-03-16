import React, {Component} from 'react';
import loadScript from 'load-script';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
const SCRIPT_ID = 'dropboxjs';

let scriptLoadingStarted = false;

// read more
// https://www.dropbox.com/developers/saver
export default class DropBoxSaver extends Component {

    static propTypes = {
        children: PropTypes.node,
        files: PropTypes.arrayOf(PropTypes.object).isRequired,
        appKey: PropTypes.string.isRequired,
        success: PropTypes.func.isRequired,
        progress: PropTypes.func,
        cancel: PropTypes.func,
        error: PropTypes.func,
        extensions: PropTypes.arrayOf(PropTypes.string),
        disabled: PropTypes.bool
    };

    static defaultProps = {
        cancel: () => {
        },
        progress: () => {
        },
        disabled: false
    };

    constructor(props) {
        super(props);

        this.onChoose = this.onChoose.bind(this);
    }

    componentDidMount() {
        if (!this.isDropboxReady() && !scriptLoadingStarted) {
            scriptLoadingStarted = true;
            loadScript(DROPBOX_SDK_URL, {
                attrs: {
                    id: SCRIPT_ID,
                    'data-app-key': this.props.appKey
                }
            });
        }
    }

    isDropboxReady() {
        return !!window.Dropbox;
    }

    onChoose() {
        if (!this.isDropboxReady() || this.props.disabled) {
            return null;
        }

        const {
            files,
            success,
            progress,
            cancel,
            error
        } = this.props;

        ////console.log(url);

        window.Dropbox.save({
            files,
            success,
            progress,
            cancel,
            error
        });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <a style={{cursor: 'pointer'}} onClick={this.onChoose}
                       className="dropbox-dropin-btn dropbox-dropin-default"><span
                        className="dropin-btn-status"></span>Save to Dropbox</a>
                </Grid>
                <Grid item xs={12}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}

