let db = require('../models/');

module.exports = function() {

function first() {
  db.Arch.create({
    email: 'email@email.com',
    password: 'password'
  }).then(function() {
    second();
  });
}

function second() {
  db.ArchContact.create({
    first_name:  'John',
    last_name:  'Doe',
    middle_name:  'J.',
    addr_number:  123,
    addr_street:  'Main',
    apt_number: 2,
    zip_code:  90210,
    city:  'Los Angeles',
    state:  'CA',
    phone_number:  5555555555,
    ArchId: 1
  }).then(function() {
    third();
  });
}

function third() {
  db.Client.create({
    email: 'email@email.com',
    password: 'password',
    ArchId: 1
  }).then(function() {
    fourth();
  });
}

function fourth() {
  db.ClientContact.create({
    first_name:  'Erlich',
    last_name:  'Bachman',
    middle_name:  'E.',
    addr_number:  42,
    addr_street:  'Wallaby Way',
    apt_number: 1,
    zip_code:  90210,
    city:  'Sydney',
    state:  'CA',
    phone_number:  3333333333,
    ClientId: 1
  }).then(function() {
    console.log('success');
  });
}

first();

};
