'use strict';
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../server');

chai.config.includeStack = true;

describe('## Service Healthcheks', () => {
  it('should check for service health', done => {
    request(app)
      .get('/')
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('started');
        expect(res.body).to.have.property('uptime');
        done();
      })
      .catch(done);
  });
});
