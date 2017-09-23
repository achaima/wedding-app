function AlbumFactory($http) {
  return {
    getAllPhotos: function() {
      return $http({
        method: 'GET',
        url: '/photos'
      });
    },
    uploadPhotoURLs: function(urls) {
      return $http({
        method: 'POST',
        url: '/photos',
        data: urls
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('AlbumFactory', AlbumFactory);
