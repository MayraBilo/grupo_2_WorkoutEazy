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

const validateEmptyInp = (message, e) => {
    const inp = e.target;
    const inpValue = e.target.value;

    if (inpValue.trim().length === 0) {
      setErrors(message, inp);
    } else {
      setErrors("", inp, false);
    }
  }

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

const validateServiceInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{6,40}$/); 

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Ingresa tu servicio, de 6 a 30 caracteres", inp);
    } else {
        setErrors("", inp, false);
    }
}; 
const validateDocument_numberInp = e => {
    const inp = e.target;
    const inpValue = e.target.value;
    const regex = new RegExp(/^\d{11,13}$/);

    if (inpValue.trim().length =! regex.test(e.target.value) ) {
        setErrors("Número documento inválido", inp);
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

//Implementación de validaciones con Expresiones regulares:

emailInp.addEventListener('blur', validateEmailFormat);
passwordInp.addEventListener('blur', validatePasswordFormat);
entity_nameInp.addEventListener('blur', validateNombreInp);
first_nameInp.addEventListener('blur', validateNombreInp);
last_nameInp.addEventListener('blur', validateNombreInp);
servicesInp.addEventListener('blur', validateServiceInp);
document_numberInp.addEventListener('blur', validateDocument_numberInp);
contact_numberInp.addEventListener('blur', validateContac_numberInp);
birth_dateInp.addEventListener('blur', validateBirthdayInp);

//validación datos completados exitosamente
emailInp.addEventListener('input', validateEmailFormat);
passwordInp.addEventListener('input', validatePasswordFormat);
entity_nameInp.addEventListener('input', validateNombreInp);
first_nameInp.addEventListener('input', validateNombreInp);
last_nameInp.addEventListener('input', validateNombreInp);
servicesInp.addEventListener('input', validateServiceInp);
document_numberInp.addEventListener('input', validateDocument_numberInp);
contact_numberInp.addEventListener('input', validateContac_numberInp);
birth_dateInp.addEventListener('input', validateBirthdayInp);

//Validación de archivo para foto perfil

avatarInp.addEventListener('blur', (e) => {
    const ind = e.target;
  const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
  const allowedExt = ["jpg", "jpeg", "png", "gif"];
  if (!allowedExt.includes(fileExt)) {
    setErrors ("Adjunta un archivo válido: .jpg, .jpeg, .png, .gif", ind);
  } else {
    setErrors("", ind, false);
  }
});

//Deshabilitar submit si no se llenan los datos

/*function validarCampos() {
    if (entity_nameInp.value.trim() !== "" && first_nameInp.value.trim() !== "" && last_nameInp.value.trim() !== "" && servicesvalue.trim() !== "" && servicesInp.value.trim() !== "" 
    && document_numberInp.value.trim() !== "" && birth_dateInp.trim() !== "" && services_cityInp.value.trim() !== "" && contact_numberInp.value.trim() !== "" && emailInp.value.trim() !== "" 
    && passwordInp.value.trim() !== "" && avatarInp.value.trim() !== "") {
        enviarBtn.removeAttribute("disabled");
    } else {
        enviarBtn.setAttribute("disabled", "true");
    }
}
*/

