var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: {
   first: String,
   last: String,
   middle: String,
  },
  gender: { type: String, enum: ['male', 'female'] },
  dates: [{ type: { type: String }, date: String}],
  phones: [{ type: { type: String }, number: String}],
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  }
});

mongoose.model('Person', PersonSchema);
