import Backbone from 'backbone';
import { Reactor } from '../utils/reactor.js';

export class Router extends Backbone.Router {
  constructor() {
    super();

    this.events = new Reactor();
  }

  routes() {
    return {
      recommendation: 'recommendation',
      // diagnosis: 'diagnosis',
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
