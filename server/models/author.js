const {Schema, model} = require('mongoose')
const {hash} = require('../helpers/bcrypt')

const authorSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Please input your Username']
    },
    email: {
        type: String,
        required: [true, 'Email needed for creating account'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.'],
        validate: {
            validator: function (value) {
                return Author.findOne({ email: value })
                    .then(author => {
                        if (author) return false
                    })
            }, message: props => `Email already registered`
        }
    },
    password: {
        type: String,
        required: [true, 'Password needed for creating account']
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
})

authorSchema.pre('save', function (next) {
    if (this.isGoogle == false) {
        this.password = hash(this.password)
    } else {
        this.password = hash(process.env.PASSWORD_Author)
    }
    next()
})

const Author = model('Author', authorSchema)

module.exports = Author