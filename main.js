$(document).ready(function(){
    console.log('ready')
    $('#reader').click(function(e){
        e.preventDefault()
        $('#mysite-side').hide()
        $('#reader-side').show()
        
    })
    $('#mysite').click(function(e){
        e.preventDefault()
        $('#mysite-side').show()
        $('#reader-side').hide()
    })

})

var quill = new Quill('#editor', {
    theme: 'snow'
});
