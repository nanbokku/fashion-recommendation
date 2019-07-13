import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Reactor } from '../utils/reactor';

export class LoginAuthentication {
  constructor() {
    this.events = new Reactor();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const id = user.id;
        this.events.dispatchEvent('logined', id);
      }
    });
  }

  authentication() {
    firebase
      .auth()
      .signInAnonymously()
      .then()
      .catch(error => {
        console.error(error.message);
      });
  }
}
