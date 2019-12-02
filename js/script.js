$(document).ready(function() {
    $('#linkNewArticle, #shortcutNewArticle').on('click', function(e) {
        e.preventDefault()
        $('#blog-post').fadeOut('slow', function() {
            $('#new-article').show();
        })
        // $('#blog-post').hide();
    })

    $('#linkListArticle').on('click', function(e) {
        e.preventDefault()
        $('#new-article').fadeOut('slow', function() {
            $('#blog-post').show();
        });
    })
})