'use strict';
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server');

chai.config.includeStack = true;

describe('## Notes', () => {
  it('should check for count of Notes model instances', done => {
    request(app)
      .get('/api/notes')
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(7);
        done();
      })
      .catch(done);
  });
});
