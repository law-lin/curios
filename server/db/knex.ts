const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');

import knex from 'knex';
export default knex(knexConfig[environment]);
