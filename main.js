// ClassicEditor
//     .create( document.querySelector( '#editor' ) )
//     .then( editor => {
//             console.log( editor );
//     } )
//     .catch( error => {
//             console.error( error );
//     } );

ClassicEditor
.create( document.querySelector( '#editor' ) )
.then( editor => { editor.ui.view.editable.editableElement.style.height = '10px'; })
.catch( error => { console.error( error ); } );

//     CKEDITOR.replace('body', {height: 500});

//     CKEDITOR.replace( 'editor1', {
//         language: 'fr',
//         uiColor: '#9AB8F3'
//     });
//     config.resize_maxWidth = 800;
//     config.resize_maxHeight = 600;
              