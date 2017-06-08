// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
// iot
//     .connect()
//     .then(() => {
//         ReactDOM.render(<App iot={iot} />, document.getElementById('root'));
//     })
//     .catch(error => {
//         console.log('Cannot connect to server', error);
//     });

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
