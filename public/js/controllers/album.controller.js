function AlbumController(AlbumFactory) {
  var controller = this;

  controller.getAllPhotos = function() {
    AlbumFactory.getAllPhotos().then(
      function(success) {
        console.log('got photos', success.data);
        controller.photos = success.data;
      },
      function(error) {
        console.warn('could not get photos', error);
      }
    );
  };

  controller.showAlbumView = function(index) {
    controller.currentPhotoIndex = index;
    controller.currentPhoto = controller.photos[controller.currentPhotoIndex];
    controller.albumView = true;
  };

  controller.nextPhoto = function() {
    if(controller.currentPhotoIndex === controller.photos.length - 1) {
      controller.currentPhotoIndex = 0;
    } else {
      controller.currentPhotoIndex++;
    }
    controller.currentPhoto = controller.photos[controller.currentPhotoIndex];
  };
  controller.previousPhoto = function() {
    if(controller.currentPhotoIndex === 0) {
      controller.currentPhotoIndex = controller.photos.length - 1;
    } else {
      controller.currentPhotoIndex--;
    }
    controller.currentPhoto = controller.photos[controller.currentPhotoIndex];
  };

  function init() {
    controller.photos = [];
    controller.albumView = false;
  }
  init();
}

AlbumController.$inject = ['AlbumFactory'];

angular
  .module('wedding-rsvp')
  .controller('AlbumController', AlbumController);
