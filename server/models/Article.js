const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:  {
        type: String,
        required: [true, 'Article title can not be empty.']
    },
    content: {
        type: String,
        required: [true, 'Article content can not be empty.']
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    slug: String,
    tags: Array,
    trashStatus: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

function convertToSlug(string)
{
    return string
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}

articleSchema.pre('save', function(next) {
    this.slug = convertToSlug(this.title);
    next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;