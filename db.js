const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig =`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${ PGDATABASE }`;
const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;
