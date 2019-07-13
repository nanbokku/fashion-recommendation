import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AlzaSyANsh9l2W3qrACrN98l8SVtKpPGJdCzKH4',
  authDomain: 'fashion-recommendation-2a1cd.firebaseapp.com',
  databaseURL: 'https://fashion-recommendation-2a1cd.firebaseio.com',
  projectId: 'fashion-recommendation-2a1cd',
  storageBucket: 'fashion-recommendation-2a1cd.appspot.com',
  messagingSenderId: '655376592547'
};

firebase.initializeApp(firebaseConfig);

export const connection = firebase.firestore().collection('users');
