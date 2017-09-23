/* global firebase */

function AuthRun() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBLIOfaBy7go5F1iWcHJrYN54QFl0jRFVY',
    authDomain: 'wedding-rsvp-41be1.firebaseapp.com',
    databaseURL: 'https://wedding-rsvp-41be1.firebaseio.com',
    projectId: 'wedding-rsvp-41be1',
    storageBucket: 'wedding-rsvp-41be1.appspot.com',
    messagingSenderId: '795167162923'
  };
  firebase.initializeApp(config);
}
function AuthFactory($firebaseAuth) {
  return $firebaseAuth();
}
AuthFactory.$inject = ['$firebaseAuth'];

angular
.module('wedding-rsvp')
.run(AuthRun)
.factory('AuthFactory', AuthFactory);
