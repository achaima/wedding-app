function GuestBookFactory ($http) {
  return {
    createPost: function(newPost) {
      return $http({
        method: 'POST',
        url: '/guestbook',
        data: newPost
      });
    },
    getAllPost: function() {
      return $http({
        method: 'GET',
        url: '/guestbook'
      });
    }
    
  };
}

GuestBookFactory.inject = ['$http'];

angular
.module('wedding-rsvp')
.factory('GuestBookFactory', GuestBookFactory);
