function GuestBookController(GuestBookFactory, $stateParams, $state) {
  var controller = this;

  controller.addPost = function(){
    console.log('im here');
    GuestBookFactory.createPost(controller.newPost).then(
        function success(response) {
          $state.reload();
          console.log('Created new post', response);
        },
        function error(err) {
          console.warn('error creating post', err);
        }
      );
  };

  controller.getAllPost = function() {
    GuestBookFactory.getAllPost($stateParams).then(
      function success (response) {
        controller.posts= response.data;
      },
      function err(err) {
        console.warn('Could not get posts', err);
      }
     );
  };

  controller.openGuestbookForm = function() {
    controller.modalForm = !controller.modalForm;
  };
  controller.confirmGuestbookMessage = function() {
    controller.guestbookMessageOpen = !controller.guestbookMessageOpen ;
  };


  function init(){
    controller.newPost = {};
    controller.posts = [];
  }

  init();

}

GuestBookController.$inject = ['GuestBookFactory', '$stateParams', '$state'];

angular
.module('wedding-rsvp')
.controller('GuestBookController', GuestBookController);
