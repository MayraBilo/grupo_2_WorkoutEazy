const first_nameInp = document.querySelector('#first_name');
const last_nameInp = document.querySelector('#last_name');
const birth_dateInp = document.querySelector('#birth_date');
const cityInp = document.querySelector('#city');
const contact_numberInp = document.querySelector('#contact_number');
const emailInp = document.querySelector('#email');
const avatarInp = document.querySelector('#avatar');
const passwordInp = document.querySelector('#password');
const condicionesInp = document.querySelector('#condiciones');
const privacidadInp = document.querySelector('#privacidad');
const enviarBtn = document.getElementById("enviar");

const setErrors = (message, inp, isError = true) => {
    if (isError) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = message;
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = " ";
    }
  }

//Validaciones con Expresiones regulares:

const validateNombreInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{3,40}$/); 

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Ingresa tus datos de 3 a 30 caracteres", inp);
    } else {
        setErrors("", inp, false);
    }
}; 
const validateBirthdayInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    //const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{3,40}$/); 

    if (inpValue.trim().length === 0 ) {
        setErrors("Ingresa tus fecha de Nacimiento", inp);
    } else {
        setErrors("", inp, false);
    }
}; 

const validateContac_numberInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^\d{10}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Número celular inválido", inp);
    } else {
        setErrors("", inp, false);
    }

};

const validateEmailFormat = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Ingresa email válido", inp);
    } else {
        setErrors("", inp, false);
    }
} 

const validatePasswordFormat = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Utiliza mímino 8 caracteres, con al menos una letra mayúscula, números y símbolos", inp);
    } else {
        setErrors("", inp, false);
    }
}