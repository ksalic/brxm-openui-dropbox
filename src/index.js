import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as UiExtension from "@bloomreach/ui-extension";
import Chooser from "./Chooser";
import DocumentField from "./DocumentField";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ui = await UiExtension.register();

        const routing = (
            <Router>
                <Switch>
                    <Route path="/chooser" render={props => <Chooser ui={ui}/>}/>
                    <Route path="/documentfield" render={props => <DocumentField ui={ui}/>}/>
                    {/*<Route exact path="/saver" render={props => <Saver ui={ui}/>}/>*/}
                </Switch>
            </Router>
        );
        ReactDOM.render(routing, document.getElementById("root"));
    } catch (error) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);
        ReactDOM.render(<App/>, document.getElementById('root'));
    }
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
