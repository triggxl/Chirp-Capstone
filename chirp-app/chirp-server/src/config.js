module.exports = {
  PORT: process.env.PORT || 8002,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://Triggxl@localhost/chirp-app',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://Triggxl@localhost/chirp-app',
  API_URL: process.env.NODE_ENV === 'production' ? 'https://git.heroku.com/ancient-chamber-86595.git' : 'http://localhost:8002',
}