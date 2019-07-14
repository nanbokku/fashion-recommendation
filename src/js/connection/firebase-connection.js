import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyANsh9l2W3qrACrN98I8SVtKpPGJdCzKH4',
  authDomain: 'fashion-recommendation-2a1cd.firebaseapp.com',
  databaseURL: 'https://fashion-recommendation-2a1cd.firebaseio.com',
  projectId: 'fashion-recommendation-2a1cd',
  storageBucket: 'fashion-recommendation-2a1cd.appspot.com',
  messagingSenderId: '655376592547'
};

firebase.initializeApp(firebaseConfig);

export const connection = firebase.firestore().collection('users');
export const auth = firebase.auth();
