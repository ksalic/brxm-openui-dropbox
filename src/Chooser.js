import React, {Component} from 'react';
import DropBoxChooser from "./DropBoxChooser";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

export default class Chooser extends Component {

    constructor(props) {
        super(props);

        this.ui = props.ui;
        this.extensionConfig = JSON.parse(this.ui.extension.config);
        this.state = {
            files: [],
            mode: 'preview'
        };
        this.onSuccess = this.onSuccess.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.dropBoxChooser = React.createRef();
    }

    componentDidMount() {
        this.setInitialState(this.ui)
            .then(files => this.isEmpty(files) ? this.setState({files: []}) : this.setState({files: files}));
    }

    async setInitialState(ui) {
        try {
            const brDocument = await ui.document.get();
            this.mode = brDocument.mode;
            this.setState({mode: this.mode});

            this.dropBoxChooser.current.changeMode(this.mode);

            const value = await ui.document.field.getValue();
            let items = JSON.parse(value);

            return items;
        } catch (error) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
    }

    isEmpty(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    onSuccess(files) {
        this.setState({files: files});
        console.log('saving files...');
        console.log(files);
        this.save();
    }

    onDelete(file) {
        const items = this.state.files.filter(value => value.id !== file.id);
        this.state.files = items;
        this.setState({files: items});
        this.save();
    }

    save() {
        const items = JSON.stringify(this.state.files);
        this.ui.document.field.setValue(items);
    }

    render() {
        const {files} = this.state || [];
        const {mode} = this.state || 'preview';
        return (
            <DropBoxChooser
                appKey={this.extensionConfig.API_KEY}
                ref={this.dropBoxChooser}
                success={files => this.onSuccess(files)}
                cancel={() => console.log('closed')}
                multiselect={this.extensionConfig.multiselect}
                linkType={'direct'}>
                <List>
                    {files.map((file, id) =>
                        <ListItem key={id}>
                            <ListItemAvatar>
                                <Avatar alt={file.name} src={file.thumbnailLink ? file.thumbnailLink : file.icon}/>
                            </ListItemAvatar>
                            <ListItemText style={{cursor: 'pointer'}} onClick={() => window.open(file.link, "_blank")}
                                          primary={file.name}/>
                            {mode === 'edit' ?
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={id => this.onDelete(file)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction> : ''}
                        </ListItem>
                    )}
                </List>
            </DropBoxChooser>
        );
    }

}
