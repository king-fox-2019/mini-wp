const http = require('http')
const app = require('../app')
const server = http.createServer(app)
const port = process.env.PORT

server.listen(port, function(err){
    if(err) console.log('Failed to connect to port')
    else console.log('Server listening to port', port)
})