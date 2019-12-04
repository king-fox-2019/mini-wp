const app = require('../app'),
    http = require('http'),
    server = http.createServer(app),
    port = process.env.PORT || 3000

server.listen(port, () => console.log('listening : ', port))
