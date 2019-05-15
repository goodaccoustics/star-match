import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './styles/general.css';

ReactDOM.hydrate(
    <App />,
    document.getElementById('mountNode'),
);