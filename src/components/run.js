import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';

// Render the main component into the dom
ReactDOM.render(<App
    foo='bar two'
    something='not so cool' />, document.getElementById('app'));
