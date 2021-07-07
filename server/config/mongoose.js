const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:27017/miniWp-King`

mongoose.connect(mongoUri,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
},(err)=>{ err ? console.log(`failed connect`) : console.log(`success connect`) })