/* global firebase */

function AuthRun() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyAet-UgJOnJrTC8o75QHOD8lhFHKvJBVjc',
    authDomain: 'wedding-app-a02aa.firebaseapp.com',
    databaseURL: 'https://wedding-app-a02aa.firebaseio.com',
    projectId: 'wedding-app-a02aa',
    storageBucket: 'wedding-app-a02aa.appspot.com',
    messagingSenderId: '140721897132'
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
