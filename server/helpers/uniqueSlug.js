const uniqueSlug = require('unique-slug');

module.exports = function(str) {
    return uniqueSlug(str);
}