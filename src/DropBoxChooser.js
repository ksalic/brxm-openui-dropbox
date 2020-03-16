import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';
import './DropBoxChooser.css';
import Grid from "@material-ui/core/Grid";

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
const SCRIPT_ID = 'dropboxjs';

let scriptLoadingStarted = false;

// read more
// https://www.dropbox.com/developers/chooser
export default class DropBoxChooser extends Component {

    static propTypes = {
        children: PropTypes.node,
        appKey: PropTypes.string.isRequired,
        success: PropTypes.func.isRequired,
        cancel: PropTypes.func,
        linkType: PropTypes.oneOf(['preview', 'direct']),
        multiselect: PropTypes.bool,
        extensions: PropTypes.arrayOf(PropTypes.string),
        disabled: PropTypes.bool
    };

    static defaultProps = {
        cancel: () => {
        },
        linkType: 'preview',
        multiselect: false,
        disabled: false,
    };


    constructor(props) {
        super(props);
        this.onChoose = this.onChoose.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode(mode) {
        this.setState({mode: mode});
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
            success,
            cancel,
            linkType,
            multiselect,
            extensions
        } = this.props;

        window.Dropbox.choose({
            success,
            cancel,
            linkType,
            multiselect,
            extensions
        });
    }

    render() {
        const {mode} = this.state || 'preview';
        return (
            <Grid container>
                {mode === 'edit' ?
                    <Grid item xs={12}>
                        <a style={{cursor:'pointer'}}  onClick={this.onChoose} className="dropbox-dropin-btn dropbox-dropin-default"><span
                            className="dropin-btn-status"></span>Choose from Dropbox</a>
                    </Grid> : ''}
                <Grid item xs={12}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}
