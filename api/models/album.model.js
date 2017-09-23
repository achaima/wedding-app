const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
  url: {
    type: String,
    required: true
  }
});

const album = mongoose.model('Album', AlbumSchema);
module.exports = album;
