import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const notes= [{
    id: 1,
    title: 'my first note',
    content: 'I need to finish the blog'
},{
    id: 2,
    title: 'my second note',
    content: 'I need to finish the blog'
}]
ReactDOM.render(<App notes={notes} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
