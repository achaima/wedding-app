function S3Controller(S3Factory, AlbumFactory, $state) {
  var controller = this;

  controller.uploadImages = function() {
    console.log(controller.images);
    var requestPromises = [];
    controller.images.forEach(function(file) {
      requestPromises.push(uploadToS3(file));
    });
    Promise.all(requestPromises).then(
      function(urls) {
        console.log('uploaded images to s3');
        AlbumFactory.uploadPhotoURLs(urls).then(
          function(success) {
            console.log('uploaded image urls to db', success.data);
            $state.go('gallery');
          },
          function(error) {
            console.warn('could not upload photo urls to db', error);
          }
        );
      }).catch(
      function(error) {
        console.warn(error);
      });
  };

  function uploadToS3(file) {
    return new Promise(function(resolve, reject) {
      // Get a signed request from aws s3 using the aws-sdk in the back-end
      S3Factory.getSignedRequests(file).then(
        function(success) {
          const url = success.data.url;
          const signedRequest = success.data.signedRequest;
          console.log('url of photo:', url);
          // Using the signed request returned from the back-end, make XHR request to s3 to upload the files
          var xhr = new XMLHttpRequest();
          xhr.open('PUT', signedRequest);
          xhr.onload = function() {
            if(xhr.status === 200){
              resolve(url);
            } else {
              reject(xhr.statusText);
            }
          };
          xhr.onerror = function() {
            reject(xhr.statusText);
          };
          xhr.send(file);
        },
        function(error) {
          reject(error);
        }
        );
    });
  }
}

S3Controller.$inject = ['S3Factory', 'AlbumFactory', '$state'];

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);
