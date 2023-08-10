const submitBtn = document.querySelector('#submit-btn')

const checkErrors = () => {
    // Agarramos todos los p de error
    let errorsHtml = Array.from(document.querySelectorAll(".error")) 
    console.log(errorsHtml)

    let errors = []

    // Hacemos un for each de cada p 

    errorsHtml.forEach(error => {
        // Si el p contiene un innerHTML => existe un error
        console.log(error.innerHTML)
        if(error.innerHTML !== ''){
            errors.push(error.innerHTML)
        }
    })
    if(errors.length > 0){
        submitBtn.disabled = true;
    }else{
        submitBtn.disabled = false;
    }
}

const nameInput = document.querySelector('#name');

nameInput.oninput = (e) => {

    const value = e.target.value;
    const length = e.target.value.length;

    if(length < 4){
        e.target.nextElementSibling.innerHTML = 'El título es inválido'
    } else {
        e.target.nextElementSibling.innerHTML = ''
    }
    checkErrors()
}

const descriptionInput = document.querySelector('#description');

descriptionInput.oninput = (e) => {

    const value = e.target.value;
    const length = e.target.value.length;

    if(length < 20){
        e.target.nextElementSibling.innerHTML = 'La descripción debe tener al menos 20 caracteres'
    } else {
        e.target.nextElementSibling.innerHTML = ''
    }
    checkErrors()
}

