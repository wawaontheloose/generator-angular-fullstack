'use strict';

var mongoose = require('mongoose'),
    config = require('../../config/environment'),
    User, user;

before(function() {
  // Connect to database
  mongoose.connect(config.mongo.uri, config.mongo.options);

  User = require('./user.model');

  user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
  });
});

after(function() {
  // Close database connection
  mongoose.connection.close();
});

describe('User Model:', function() {

  // Clear users before testing
  before(function() {
    return User.remove().exec();
  });

  describe('User (schema)', function() {

    it('should begin with no users', function() {
      return User.find({}).exec().should.eventually.have.length(0);
    });

  });

  describe('user (instance)', function() {

    describe('.save()', function() {
      // Clear users after tests
      afterEach(function() {
        return User.remove().exec();
      });

      it('should fail when saving a duplicate user', function(done) {
        user.save(function() {
          var userDup = new User(user);
          userDup.save(function(err) {
            err.should.be.instanceOf(Error);
            done();
          });
        });
      });

      it('should fail when saving without an email', function(done) {
        user.email = '';
        user.save(function(err) {
          err.should.be.instanceOf(Error);
          done();
        });
      });

    });

    describe('.authenticate()', function() {

      it("should authenticate user if password is valid", function() {
        user.authenticate('password').should.be.true;
      });

      it("should not authenticate user if password is invalid", function() {
        user.authenticate('blah').should.not.be.true;
      });

    });

  });

});
