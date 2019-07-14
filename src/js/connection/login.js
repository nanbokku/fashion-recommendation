import { auth } from './firebase-connection.js';
import { Reactor } from '../utils/reactor';

export class LoginAuthentication {
  constructor() {
    this.events = new Reactor();

    auth.onAuthStateChanged(user => {
      if (user) {
        const id = user.uid;
        this.events.dispatchEvent('logined', id);
      }
    });
  }

  authentication() {
    auth
      .signInAnonymously()
      .then()
      .catch(error => {
        console.error(error.message);
      });
  }
}
