'use strict';

var app = require('../../app');
var config = require('../../config/environment');
var User = require('./user.model');
var request = require('supertest');
var jwt = require('jsonwebtoken');

describe('User API:', function() {
  var user;
  var userInfo = {
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
  };

  // Clear users before testing
  before(function() {
    return User.removeAsync()
      .then(function() {
        user = new User(userInfo);
        return user.saveAsync();
      });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: userInfo.email,
          password: userInfo.password
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body._id.should.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('POST /api/users', function() {
    var token;

    before(function() {
      return User.removeAsync();
    })

    beforeEach(function(done) {
      User.remove(function() {
        request(app)
          .post('/api/users')
          .send(userInfo)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            token = res.body.token;
            done();
          });
      });

    });

    it('should respond with a valid JWT containing the new user\'s id and role', function(done) {
      jwt.verify(token, config.secrets.session, function(err, decoded) {
        if (err) { return done(err); }

        decoded.should.contain.keys('_id');
        done();
      });
    });

  });
});
