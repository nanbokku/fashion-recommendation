// import React from 'react';
// import RecommendationView from '../view/recommendation.jsx';
import Backbone from 'backbone';
// import DiagnosisView from '../view/diagnosis.jsx';
// import { LoginAuthentication } from '../connection/login.js';
// import PersonalColorDiagnosisView from '../view/personal-color-diagnosis.jsx';
// import { UsersModel } from '../model/users.js';
import { Reactor } from '../utils/reactor.js';

export class Router extends Backbone.Router {
  constructor() {
    super();

    this.events = new Reactor();
  }

  routes() {
    return {
      '': 'recommendation',
      diagnosis: 'diagnosis',
      'diagnosis/personal-color': 'personalColorDiagnosis',
      'personal-color/:type': 'personalColorResult'
    };
  }

  recommendation() {
    this.events.dispatchEvent('recommendation');
  }

  diagnosis() {
    this.events.dispatchEvent('diagnosis');
  }

  personalColorDiagnosis() {
    this.events.dispatchEvent('personal-color-diagnosis');
  }

  personalColorResult(type) {
    this.events.dispatchEvent('personal-color-result', type);
  }
}
