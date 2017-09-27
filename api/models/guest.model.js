const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = Schema({
  firstName: {
    type: String,
    required: [true, 'First name field is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required']
  },
  extraGuests: {
    type: Number,
    required: [true, 'This field is required'],
    default: 0
  },
  attendingEvents: {
    type: String,
    required: [true, 'This field is required']
  },
  email: {
    type: String,
    required: false
  },
  number: {
    type: Number,
    required: false
  }
});

const weddingGuests = mongoose.model('Guest', GuestSchema);
module.exports = weddingGuests;
