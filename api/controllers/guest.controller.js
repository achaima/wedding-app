const Guest = require('../models/guest.model');

function getAll(req, res) {
  Guest.find((err, guests) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(guests);
    }
  });
}

function getGuest(req, res) {
  const guestId = req.params.guestId;

  Guest.findOne({ _id: guestId},(err, guest) => {
    if (err) {
      return res.json(err,'could not retrieve this guest');
    } else {
      return res.status(200).json(guest);
    }
  });
}

function createGuest(req, res) {
  Guest.create(req.body, (err) => {
    if (err) {
      return res.json(err, 'went wrong here');
    } else {
      return res.status(200).json({Guest});
    }
  });
}

function deleteGuest(req, res) {
  const guestId = req.params.guestId;
  Guest.deleteOne({ _id: guestId },(err) => {
    if (err) {
      return res.json(err, 'Could not find guest to delete');
    } else {
      return res.status(200).json({Guest});
    }
  });
}
function updateGuest(req, res) {
  const guestId = req.params.guestId;
  const updatedGuest = req.body;
  Guest.findById({ _id: guestId },(err, guest) => {
    if (err) return res.json(err, 'Could not get existing guest to update');
    if(updatedGuest.firstName) guest.firstName = updatedGuest.firstName;
    if(updatedGuest.lastName) guest.lastName = updatedGuest.lastName;
    if(updatedGuest.attendingEvents) guest.attendingEvents = updatedGuest.attendingEvents;
    if(updatedGuest.extraGuests) guest.extraGuests = updatedGuest.extraGuests;
    guest.save((error) => {
      if(error) return res.json({ message: 'could not get guest to save'});
      res.json({ message: 'guest successfully saved'});
    });
  });
}


module.exports = {
  createGuest,
  deleteGuest,
  getAll,
  getGuest,
  updateGuest
};
