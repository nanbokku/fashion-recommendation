import { connection } from '../connection/firebase-connection.js';

export class UsersModel {
  constructor() {}

  add(item) {
    return connection
      .add(item)
      .then(doc => {
        return doc.id;
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetch(id) {
    return connection
      .doc(id)
      .get()
      .then(querySnapshot => {
        return querySnapshot.data();
      })
      .catch(error => {
        console.error(error);
      });
  }

  update(item) {
    connection
      .doc(item.id)
      .update(item)
      .then(() => {})
      .catch(error => {
        console.error(error);
      });
  }

  delete(id) {
    connection
      .doc(id)
      .delete()
      .then(() => {})
      .catch(error => {
        console.error(error);
      });
  }
}
