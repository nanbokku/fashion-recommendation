import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { RecommendationsModel } from '../model/recommendations.js';
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
    // const diagnosed = $.cookie('diagnosed');
    // if (diagnosed) {
    //   // 過去に一度診断したことがある場合はトップページを表示
    // } else {
    //   // 診断したことがないときは診断ページを表示
    //   ReactDOM.render(<DiagnosisView />, $('#content').get(0));
    // }
  }
}
