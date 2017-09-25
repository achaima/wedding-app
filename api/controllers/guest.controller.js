var Guest = require('../models/guest.model');

function getAll(req, res) {
  Guest.find(function(err, guests){
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(guests);
    }
  });
}

function getGuest(req, res) {
  var guestId = req.params.guestId;

  Guest.findOne({ _id: guestId}, function(err, guest){
    if (err) {
      return res.json(err,'could not retrieve this guest');
    } else {
      return res.status(200).json(guest);
    }
  });
}

function createGuest(req, res) {
  Guest.create(req.body, function(err) {
    if (err) {
      return res.json(err, 'went wrong here');
    } else {
      return res.status(200).json({Guest});
    }
  });
}

function deleteGuest(req, res) {
  var guestId = req.params.guestId;
  Guest.deleteOne({ _id: guestId }, function(err) {
    if (err) {
      return res.json(err, 'Could not find guest to delete');
    } else {
      return res.status(200).json({Guest});
    }
  });
}
function updateGuest(req, res) {
  var guestId = req.params.guestId;
  var updatedGuest = req.body;
  Guest.findById({ _id: guestId }, function(err, guest) {
    if (err) return res.json(err, 'Could not get existing guest to update');
    if(updatedGuest.firstName) guest.firstName = updatedGuest.firstName;
    if(updatedGuest.lastName) guest.lastName = updatedGuest.lastName;
    if(updatedGuest.attendingEvents) guest.attendingEvents = updatedGuest.attendingEvents;
    if(updatedGuest.extraGuests) guest.extraGuests = updatedGuest.extraGuests;
    guest.save(function(error) {
      if(error) return res.json({ message: 'could not get guest to save'});
      res.json({ message: 'guest successfully saved'});
    });
  });
}


module.exports = {
  createGuest: createGuest,
  deleteGuest: deleteGuest,
  getAll: getAll,
  getGuest: getGuest,
  updateGuest: updateGuest
};
