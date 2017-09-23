function GuestFactory ($http) {
  return {
    createGuest: function(newGuest) {
      return $http({
        method: 'POST',
        url: '/guests',
        data: newGuest
      });
    },
    deleteGuest: function(guestId) {
      return $http({
        method: 'DELETE',
        url: `/guests/${guestId}`
      });
    },
    getGuest: function(guestId) {
      return $http({
        method: 'GET',
        url: `/guests/${guestId}`
      });
    },
    updateGuest: function(updatedGuest, guestId) {
      return $http({
        method: 'PATCH',
        url: `/guests/${guestId}`,
        data: updatedGuest
      });
    },

  //   getSingleUser: function(uid) {
  //     return $http({
  //       method: 'GET',
  //       url: `/guests/${uid}`,
  //       data: uid
  //     });
  //   }
  // };
    getAll: function() {
      return $http({
        method: 'GET',
        url: '/guest'
      });
    }
  };


}


GuestFactory.$inject = ['$http'];
angular
  .module('wedding-rsvp')
  .factory('GuestFactory', GuestFactory);
