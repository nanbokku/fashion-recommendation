import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Controller } from './controllers/controller.jsx';

$(() => {
  ReactDOM.render(<Controller />, $('#content').get(0));
});
