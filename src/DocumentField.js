import React, {Component, Fragment} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import TabPanel from "./TabPanel";
import Chooser from "./Chooser";
import {CloudUpload} from "@material-ui/icons";
import SvgIcon from "@material-ui/core/SvgIcon";
import Saver from "./Saver";

export default class DocumentField extends Component {

    constructor(props) {
        super(props);

        this.ui = props.ui;
        this.extensionConfig = JSON.parse(this.ui.extension.config);

        this.state = {
            value: 0
        }

    }

    render() {
        const {value} = this.state || 0;

        return <Fragment>
            <AppBar position="static">
                <Tabs value={value} onChange={(event, newValue) => this.setState({value: newValue})}
                      aria-label="simple tabs example">
                    <Tab label={'Picker'} icon={<SvgIcon style={{backgroundSize: '24px 24px'}}>
                        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 4.002l-5 3 4 2.984-4.01 3.008L8 16.002l4-3-5-3 5-3 5 3.015-5 2.985 4 3 5.01-3.024L17 10.002l4-3-5-3-4 2.984-4-2.984zm4 10l-4 3-1-.6v.6l5 3 5-3v-.604l-1 .604-4-3z"
                                color="#000" fill="#ffffff"/>
                        </svg>
                    </SvgIcon>} aria-label="phone"/>
                    <Tab label={'Upload'} icon={<CloudUpload/>} aria-label="upload to dropbox"/>
                </Tabs>

            </AppBar>
            <TabPanel value={value} index={0}>
                <Chooser ui={this.ui}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Saver ui={this.ui}/>
            </TabPanel>
        </Fragment>
    }

}
