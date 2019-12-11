'use strict';

const mongoose = require('mongoose');
const jwt = require('../helpers/jwt');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title Cannot Be Empty !!!`],
        validate: {
            validator: (title) => {
                return Article.findOne({
                    $and: [
                        { title: title },
                    ]
                })
                    .then(article => {
                        if (article) {
                            return false
                        }
                    })
            },
            message: props => `Title ${props.value} alreay exists in database !!!`
        }
    },
    content: {
        type: String,
        required: [true, `Content Cannot Be Empty !!!`],
    },
    author: {
        type: String,
        required: [true, `Author Cannot Be Empty !!!`],
    },
    featured_image: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;