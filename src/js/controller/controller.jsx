import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { RecommendationsModel } from '../model/recommendations.js';
import { DiagnosisView } from '../view/diagnosis.jsx';
import { UsersModel } from '../model/users.js';

export class Controller {
  constructor() {
    this.recommendModel = new RecommendationsModel();

    // this.test();

    // initialize model
    this.initialize();
  }

  async test() {
    const usersModel = new UsersModel();
  }

  initialize(items) {
    ReactDOM.render(<DiagnosisView />, $('#content').get(0));
  }
}
