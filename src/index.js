// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import { IoT } from './common';
const iot = new IoT({
    onMessage(topic) {
        console.log('root', topic);
    }
});
iot
    .connect()
    .then(() => {
        ReactDOM.render(<App iot={iot} />, document.getElementById('root'));
    })
    .catch(error => {
        alert('Cannot connect to server');
    });

// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
