const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function(err){
    if(err) console.log('Failed to connect mongoose')
    else console.log('Success to connect database')
})

module.exports = mongoose