import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import { Controller } from './controller/controller.jsx';
import { Router } from './controller/router.jsx';

$(() => {
  ReactDOM.render(<Router />, $('#content').get(0));
  // const controller = new Controller();
});
