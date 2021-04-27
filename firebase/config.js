import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQF8-AXzuTo_hxQz2FW3biOfGNLDvT4N4', 
  authDomain: 'your-auth-domain-b1234.firebaseapp.com', // Post Auth Setup
  databaseURL: 'https://your-database-name.firebaseio.com', // Post Database Setup
  projectId: 'i-employee', 
  storageBucket: 'i-employee.appspot.com',
  messagingSenderId: '12345-insert-yourse', // Post Cloud Messaging Setup
  appId: '1:180627563564:android:351adc0da60645f2d31d89', 
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };