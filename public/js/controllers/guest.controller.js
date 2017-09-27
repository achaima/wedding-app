function GuestController(GuestFactory, $stateParams, $state) {
  const controller = this;

//****************************GET GUEST***********************************//
  controller.getGuest= function(guestId){
    if (guestId) {
      GuestFactory.getGuest(guestId).then(
        (success) => {
          controller.guestDetails = success.data;
        },
        (error) => {
          console.warn('Error getting guest:', error.message);
        }
      );
    }
  };

  function categoriseGuests(){
    controller.guests.forEach((guest) => {
      controller.eventOptions.forEach((event) => {
        if(guest.attendingEvents === event) {
          controller.allGuests[event].push(guest);
        }
      });
    });
  }

  function sumEventGuests(event) {
    let extraGuests = controller.allGuests[event].reduce((sum, guest) => {
      return sum += guest.extraGuests;
    }, 0);

    const both = controller.allGuests['Both'];
    both.forEach((guest) => {
      extraGuests += guest.extraGuests;
    });

    const total = extraGuests + both.length + controller.allGuests[event].length;

    return total;
  }

  controller.getAll = () => {
    GuestFactory.getAll().then(
      (response) => {
        controller.guests = response.data;

        controller.registeredGuests = controller.guests.length;
        categoriseGuests();
        controller.whiteWeddingGuestsTotal = sumEventGuests('White Wedding');
        controller.traditionalGuestsTotal = sumEventGuests('Traditional Wedding');

        controller.totalGuests = controller.whiteWeddingGuestsTotal + controller.traditionalGuestsTotal;
      },
      (err) => {
        console.warn('Could not get guests', err);
      }
     );
  };
//****************************ADD GUEST***********************************//

  controller.AddGuest = () => {
    GuestFactory.createGuest(controller.newGuest).then(
      (response) => {
        $state.reload();
        console.log('Created new Guest:', response);
      },
      (error) => {
        console.warn('Error creating Guest:', error);
      }
    );
  };

//**************************DELETE GUEST***********************************//
  controller.deleteGuest = (guestId) => {

    GuestFactory.deleteGuest(guestId).then(
      () => {
        $state.reload();
      },
      (error) => {
        console.warn('Error deleting guest:', error);
      }
   );
  };

//**************************UPDATE GUEST***********************************//
  controller.updateGuest = (updatedGuest) => {
    const guestId = updatedGuest._id;

    GuestFactory.updateGuest(updatedGuest, guestId).then(
      () => {
        $state.reload();
      },
      (error) => {
        console.warn('Error updating guest:', error);
      }
    );
  };


  //******ORDER BY HEADERS******//
  controller.orderBy = (header) => {
    if(controller.headerSort === header) {
      controller.headerSort = '-' + header;
    } else {
      controller.headerSort = header;
    }
  };

  //******FILTER******//
  controller.filterBy = (eventFilter) => {
    if(controller.eventFilter === eventFilter) {
      controller.eventFilter = '';
    } else {
      controller.showPaginator = false;
      controller.eventFilter = eventFilter;
    }
  };

  controller.editGuest = (person) => {
    controller.updatedGuest = person;
  };

  controller.disableEdit = () => {
    controller.isEditDisabled = true;
  };
  controller.enableEdit = () => {
    controller.isEditDisabled = false;
  };

  controller.openModal= (person) => {
    controller.modalShown = !controller.modalShown;
    controller.deletingPerson = person;
  };

  controller.rsvpGuest = () => {
    console.log('clicked');
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
    controller.isEditDisabled = false;
    controller.allGuests = {
      'Traditional Wedding': [],
      'White Wedding': [],
      'Both': []
    };
    controller.rsvpForm = false;
  }
  init();
}
//********************************************************************//
GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);
