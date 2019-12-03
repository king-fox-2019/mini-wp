const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, 
{useNewUrlParser: true, useUnifiedTopology: true},
(err)=>{
    if(err)
        console.log('Failed to connect \n', err)
    else
        console.log('Mongoose Connected')
      
});

module.exports = mongoose