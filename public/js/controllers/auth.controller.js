function AuthController($state, AuthFactory) {
  const controller = this;

  controller.signIn = () => {
    controller.error = null;
    AuthFactory.$signInWithEmailAndPassword(controller.email, controller.password).then(
      () => {
        resetCredentials();
        $state.go('home');
      },
      (error) => {
        controller.error = error;
        console.warn('could not log in with email and password:', error);
        resetCredentials();
      }
    );
  };

  controller.signOut = () => {
    AuthFactory.$signOut();
    $state.go('login');
  };

  function resetCredentials() {
    controller.email = null;
    controller.password = null;
  }

  function init() {
    controller.user = null;
    controller.error = null;
    controller.email = '';
    controller.password = '';
    AuthFactory.$onAuthStateChanged((user) => {
      console.log('auth state changed: user:', user);
      controller.user = user;
    });
  }

  init();
}
AuthController.$inject = ['$state', 'AuthFactory'];

angular
  .module('wedding-rsvp')
  .controller('AuthController', AuthController);
