import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { App } from './controllers/app.jsx';

$(() => {
  ReactDOM.render(<App />, $('#content').get(0));
});
