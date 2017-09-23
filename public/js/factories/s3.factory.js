function S3Factory($http) {
  return {
    getSignedRequests: function(file) {
      return $http({
        method: 'GET',
        url: `/sign-s3?file-name=${file.name}&file-type=${file.type}`
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('S3Factory', S3Factory);
