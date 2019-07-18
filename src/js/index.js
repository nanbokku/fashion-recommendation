import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { App } from './app.jsx';

$(() => {
  ReactDOM.render(<App />, $('#content').get(0));
});
