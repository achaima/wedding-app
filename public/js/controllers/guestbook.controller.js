function GuestBookController(GuestBookFactory, $stateParams, $state) {
  const controller = this;

  controller.addPost = () => {
    GuestBookFactory.createPost(controller.newPost).then(
        (response) => {
          $state.reload();
          console.log('Created new post', response);
        },
        (err) => {
          console.warn('error creating post', err);
        }
      );
  };

  controller.getAllPost = () => {
    GuestBookFactory.getAllPost($stateParams).then(
      (response) => {
        controller.posts= response.data;
      },
      (err) => {
        console.warn('Could not get posts', err);
      }
     );
  };

  controller.openGuestbookForm = () => {
    controller.modalForm = !controller.modalForm;
  };
  controller.confirmGuestbookMessage = () => {
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
