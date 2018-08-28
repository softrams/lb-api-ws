'use strict';
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server');

chai.config.includeStack = true;

describe('## Books', () => {
  it('should check for Book model instances', done => {
    request(app)
      .get('/api/books')
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
        done();
      })
      .catch(done);
  });
});
