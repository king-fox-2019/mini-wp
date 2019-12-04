const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/MiniWP', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, function(err) {
    if(err){
        console.log('batabase error')
    } else {
        console.log('batabase connected')
    }
})