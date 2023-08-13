const emailInpLogin = document.querySelector('#email');
const passwordInpLogin = document.querySelector('#password');

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

  const validateEmailFormat = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Ingresa email válido", inp);
    } else {
        setErrors("", inp, false);
    }
};

const validatePasswordFormat = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Utiliza mímino 8 caracteres, con al menos una letra mayúscula, números y símbolos", inp);
    } else {
        setErrors("", inp, false);
    }
};

//Implementación de validaciones con Expresiones regulares:

emailInpLogin.addEventListener('blur', validateEmailFormat);
passwordInpLogin.addEventListener('blur', validatePasswordFormat);

//validación datos completados exitosamente
emailInpLogin.addEventListener('input', validateEmailFormat);
passwordInpLogin.addEventListener('input', validatePasswordFormat);

