'use strict';

module.exports = {
  db: {
    connector: 'mysql',
    hostname: '<HOSTNAME>',
    port: process.env.DB_PORT || 3306,
    user: '<USERNAME>',
    password: '<PASSWORD>',
    database: 'workshopdb'
  }
};
