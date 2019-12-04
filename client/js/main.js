$(document).ready(function() {
    welcome()
    $('#add-article-dropdown').click(function(e) {
        e.preventDefault()
        showAdd()
    })
    $('#list-article-dropdown').click(function(e) {
        e.preventDefault()
        showList()
    })
    $('#dashboard-sidebar').click(function(e) {
        e.preventDefault()
        welcome()
    })
})

function welcome() {
    $('#dashboard-main').show()
    $('#list-post-main').hide()
    $('#add-post-main').hide()
}

function showList() {
    $('#dashboard-main').hide()
    $('#list-post-main').show()
    $('#add-post-main').hide()
}

function showAdd() {
    $('#dashboard-main').hide()
    $('#list-post-main').hide()
    $('#add-post-main').show()
}