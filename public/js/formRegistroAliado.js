const entity_nameInp = document.querySelector('#entity_name');
const first_nameInp = document.querySelector('#first_name');
const last_nameInp = document.querySelector('#last_name');
const servicesInp = document.querySelector('#services');
const document_numberInp = document.querySelector('#document_number');
const birth_dateInp = document.querySelector('#birth_date');
const services_cityInp = document.querySelector('#services_city');
const contact_numberInp = document.querySelector('#contact_number');
const emailInp = document.querySelector('#email');
const passwordInp = document.querySelector('#password');
const avatarInp = document.querySelector('#avatar');

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

//Validaciones con Expresiones regulares
const validateEmptyInp = (message, e) => {
    const inp = e.target;
    const inpValue = e.target.value;

    if (inpValue.trim().length === 0) {
      setErrors(message, inp);
    } else {
      setErrors("", inp, false);
    }
  }
/*const validateEntiInp = (message, e) => {
    const inp = e.target;
    const inpValue = e.target.value;

    if (inpValue.trim().length === 0) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = message;
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = " ";
    }
};*/
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

const validateServiceInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{6,40}$/); 

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Ingresa tu servicio, de 6 a 30 caracteres";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
    }
};
const validateDocument_numberInp = e => {
    const inp = e.target;
    const inpValueDocument = e.target.value;
    const regex = new RegExp(/^\d{11,13}$/);

    if (!regex.test(inpValueDocument)){
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Número documento inválido";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
    }

};
const validateContac_numberInp = e => {
    const inp = e.target;
    const inpValueContact = e.target.value;
    const regex = new RegExp(/^\d{10}$/);

    if (!regex.test(inpValueContact)){
        //(inpValueContact.trim().length =! regex.test(e.target.value))
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Número celular inválido";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
    }

};

const validateEmailFormat = e => {
    const inp = e.target;
    const inpValueEmail = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!regex.test(inpValueEmail)) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Ingresa email válido";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
    }
}

const validatePasswordFormat = e => {
    const inp = e.target;
    const inpValuePassword = e.target.value;
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/);

    if (!regex.test(inpValuePassword)) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Utiliza mímino 8 caracteres, con al menos una letra mayúscula, números y símbolos";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
}
}

//Implementación de validaciones con Expresiones regulares
emailInp.addEventListener('input', validateEmailFormat);
passwordInp.addEventListener('input', validatePasswordFormat);
entity_nameInp.addEventListener('blur', validateNombreInp);
first_nameInp.addEventListener('blur', validateNombreInp);
last_nameInp.addEventListener('blur', validateNombreInp);
servicesInp.addEventListener('blur', validateServiceInp);
document_numberInp.addEventListener('input', validateDocument_numberInp);
contact_numberInp.addEventListener('input', validateContac_numberInp);

//Validaciones de espacio vacío
emailInp.addEventListener('blur', (e) => validateEntiInp("Ingresa información requerida", e));
passwordInp.addEventListener('blur', (e) => validateEntiInp("Ingresa contraseña requerida", e));
document_numberInp.addEventListener('blur', (e) => validateEntiInp("Ingresa información requerida", e));
contact_numberInp.addEventListener('blur', (e) => validateEntiInp("Ingresa número celular", e));
birth_dateInp.addEventListener('blur', (e) => validateEntiInp("Ingresa fecha de nacimiento", e));
services_cityInp.addEventListener('blur', (e) => validateEntiInp("Ingresa ciudad de servicios", e));

//Validación de archivo para foto perfil

avatarInp.addEventListener('input', (e) => validateEntiInp("Subir foto de perfil", e));

avatarInp.addEventListener('blur', (e) => {
    const inp = e.target;
    const avatarExt = e.target.files[0].name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "gif"];
    if (!allowedExt.includes(avatarExt)) {
        inp.classList.add("invalid");
        inp.nextElementSibling.classList.add("error");
        inp.nextElementSibling.innerText = "Adjunta un archivo válido: .jpg, .jpeg, .png, .gif";
    } else {
        inp.classList.remove("invalid");
        inp.nextElementSibling.classList.remove("error");
        inp.nextElementSibling.innerText = "";
    }
});

  
