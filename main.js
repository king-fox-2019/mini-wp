$(document).ready(function () {
    // printLorem()
    insertCard()
    $("#sidebar").mCustomScrollbar({
         theme: "minimal"
    });

    $('#sidebarToggleButton').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
 


});



function printLorem()
{
    $('#contentArticle').empty()
    $('#contentArticle').append(`
    <div>
        <h1>Collapsible Sidebar Using Bootstrap 4</h1>
    </div>
    `)

    for (let x = 0; x < 10; x++)
    {
        $('#contentArticle').append(`
            <div>
                <h2>Lorem Ipsum Dolor${x}</h2>
                lalalalal
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        `)
    }
    
}


function insertCard()
{
    $('#cardContainer').empty()

    for(let x = 0; x < 5; x++)
    {
        $('#cardContainer').append(`
            <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card #${x+1} title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        `)
    }

}


