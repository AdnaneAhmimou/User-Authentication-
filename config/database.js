const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;

const connection = mongoose.connect(conn).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error('Could not connect to MongoDB', err));

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});


const User = mongoose.model('User', UserSchema);


module.exports = mongoose;