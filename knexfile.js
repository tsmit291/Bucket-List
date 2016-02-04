require('dotenv').load()
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/bucketlist',
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    seeds: {
      directory: './seeds'
    }
  }
};
