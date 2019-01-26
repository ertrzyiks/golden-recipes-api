module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 1 }
}
