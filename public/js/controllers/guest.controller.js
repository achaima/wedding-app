function GuestController(GuestFactory, $stateParams, $state) {
  var controller = this;

  controller.editGuest = function(person) {
    controller.updatedGuest = person;
  };

//****************************GET GUEST***********************************//
  controller.getGuest= function(guestId){
    if (guestId) {
      GuestFactory.getGuest(guestId).then(
        function success(success) {
          controller.guestDetails = success.data;
        },
        function error(error) {
          console.warn('Error getting guest:', error.message);
        }
      );
    }
  };

  // controller.changePage = function(page) {
  //   controller.upper = page * 10;
  //   controller.lower = (page - 1) * 10;
  // };

  function categoriseGuests(){
    controller.guests.forEach(function(guest) {
      controller.eventOptions.forEach(function(event) {
        if(guest.attendingEvents === event) {
          console.log(event);
          controller.allGuests[event].push(guest);
        }
      });
    });
  }

  function sumEventGuests(event) {
    let total = controller.allGuests[event].reduce(function(sum, guest){
      return sum += guest.extraGuests;
    }, 0);
    //maybe name this Both guests as a var
    controller.allGuests['Both'].forEach(function(guest) {
      total += guest.extraGuests;
    });
    total += controller.allGuests['Both'].length;
    return total;
  }

  controller.getAll = function() {
    GuestFactory.getAll($stateParams).then(
      function success (response) {
        controller.guests = response.data;
        controller.registeredGuests = controller.guests.length;

        categoriseGuests();
        controller.whiteWeddingGuestsTotal = sumEventGuests('White Wedding');
        controller.traditionalGuestsTotal = sumEventGuests('Traditional Wedding');

        controller.totalGuests = controller.whiteWeddingGuestsTotal + controller.traditionalGuestsTotal;


        // createPagesArray(controller.guests);
      },
      function err(err) {
        console.warn('Could not get guests', err);
      }
     );
  };



//****************************ADD GUEST***********************************//

  controller.AddGuest = function() {
    GuestFactory.createGuest(controller.newGuest).then(
            function sucess(response) {
              $state.reload();
              console.log('Created new Guest:', response);
            },
            function error(error) {
              console.warn('Error creating Guest:', error);
            }
          );
  };

//**************************DELETE GUEST***********************************//

  controller.deleteGuest = function(guestId) {

    GuestFactory.deleteGuest(guestId).then(
      function sucess(response) {
        $state.reload();
        console.log('deleted guest:', response);
      },
      function error(error) {
        console.warn('Error deleting guest:', error);
      }
   );
  };

//**************************UPDATE GUEST***********************************//
  controller.updateGuest = function (updatedGuest) {
    const guestId = updatedGuest._id;

    GuestFactory.updateGuest(updatedGuest, guestId).then(
      function success() {
        $state.reload();
      },
      function error(error) {
        console.warn('Error updating guest:', error);
      }
    );
  };


  //**************************ORDER BY HEADERS***********************************//

  controller.orderBy = function(header) {
    if(controller.headerSort === header) {
      controller.headerSort = '-' + header;
    } else {
      controller.headerSort = header;
    }
  };

  controller.filterBy = function(eventFilter) {
    if(controller.eventFilter === eventFilter) {
      // controller.showPaginator = true;
      controller.eventFilter = '';
    } else {
      controller.showPaginator = false;
      controller.eventFilter = eventFilter;
    }
  };

  // controller.changePage = function(page) {
  //   controller.lower = (page * 10) - 10;
  //   controller.upper = page * 10;
  //   controller.enableEdit();
  // };

  controller.disableEdit = function() {
    controller.isEditDisabled = true;
  };
  controller.enableEdit = function() {
    controller.isEditDisabled = false;
  };

  // function createPagesArray(guests) {
  //   var pages = Math.ceil(guests.length/10);
  //   for(var i = 1; i <= pages; i++) {
  //     controller.pageNumbers.push(i);
  //   }
  // }

  controller.openModal= function(person) {
    controller.modalShown = !controller.modalShown;
    controller.deletingPerson = person;
  };

  controller.rsvpGuest = function(){
    console.log('hi');
    controller.rsvpForm = !controller.rsvpForm;
  };

  controller.confirmGuest = function() {
    controller.addGuestModal = !controller.addGuestModal;
  };


//**************************INITIALISE***********************************//
  function init() {
    controller.extraGuestsOptions = [1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    controller.guestDetails = {};
    controller.pageNumbers = [];
    controller.lower = 0;
    controller.upper = 10;
    controller.isEditDisabled = false;
    controller.allGuests = {
      'Traditional Wedding': [],
      'White Wedding': [],
      'Both': []
    };
    // controller.showPaginator = true;

  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);
