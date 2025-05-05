const { createClient } = require('redis')

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err)
})

redisClient.connect().then(() => {
  console.log('Redis connesso')
}).catch(console.error)

module.exports = redisClient
