


   
   (function (){

    'use strict'

    //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form');
    Array.from(forms) //make forms into an array
    //     // Loop over them and prevent submission
    .forEach(function (form){
    form.addEventListener('submit', function (event){
    if(!form.checkValidity()){

    event.preventDefault()
    event.stopPropagation()
    }
    form.classList.add('was-validated')
            }, false)
    })


    })()




