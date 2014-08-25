'use strict';

var app = require('../../app');
var User = require('./user.model');

var user;

var freshUser = function(done) {
  User.remove().exec(function(err) {
    if (err) return done(err);
    user = new User({
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    });
  });
};

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
    // Reset user before each instance test
    beforeEach(function(done) {
      freshUser(done);
    });

    describe('.save()', function() {

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
          user.email = 'test@test.com';
          err.should.be.instanceOf(Error);
          done();
        });
      });

    });

    describe('.authenticate()', function() {

      it("should authenticate user if password is valid", function() {
        return user.authenticate('password').should.be.true;
      });

      it("should not authenticate user if password is invalid", function() {
        return user.authenticate('blah').should.not.be.true;
      });

    });

    describe('.changeEmail()', function() {

      it('should allow the user to change their email address', function(done) {
        user.email.should.equal('test@test.com');
        user.changeEmail('test@test.com', 'new@new.com', function() {
          user.email.should.equal('new@new.com');
          done();
        });
      });

    });

    describe('.emails', function() {

      it('should return an array of the user\'s email addresses', function() {
        console.log(user.emails);
        user.emails.should.be.an('array');
      });

    });

  });

});
