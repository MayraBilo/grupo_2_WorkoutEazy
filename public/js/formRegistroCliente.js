console.log("archivo vinculado");

const first_name_Inp = document.querySelector("#first_name");
const last_name_Inp = document.querySelector("#last_name");
const birth_date_Inp = document.querySelector("#birth_date");
const city_Inp = document.querySelector("#city");
const contact_number_Inp = document.querySelector("#contact_number");
const email_Inp = document.querySelector("#email");
const avatar_Inp = document.querySelector("#avatar");
const password_Inp = document.querySelector("#password");
const condiciones_Inp = document.querySelector("#condiciones");
const privacidad_Inp = document.querySelector("#privacidad");
const enviar_Btn = document.getElementById("enviar");

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
};

//Validaciones con Expresiones regulares:

const validateNameInp = (e) => {
  const inp = e.target;
  const inpValue = e.target.value;
  const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{3,40}$/);
  console.log(inpValue);
  if ((inpValue.trim().length = !regex.test(e.target.value))) {
    setErrors("Ingresa tus datos de 3 a 30 caracteres", inp);
  } else {
    setErrors("", inp, false);
  }
};
const validateBirth_date_Inp = (e) => {
  const inp = e.target;
  const inpValue = e.target.value;
  const regex = new RegExp(/^[a-zA-ZÀ-ÿ\s]{3,40}$/);

  if (inpValue.trim().length === 0) {
    setErrors("Ingresa tus fecha de Nacimiento", inp);
  } else {
    setErrors("", inp, false);
  }
};

const validateContact_numberInp = (e) => {
  const inp = e.target;
  const inpValue = e.target.value;
  const regex = new RegExp(/^\d{10}$/);

  if ((inpValue.trim().length = !regex.test(e.target.value))) {
    setErrors("Número celular inválido", inp);
  } else {
    setErrors("", inp, false);
  }
};

const validateEmail_format = (e) => {
  const inp = e.target;
  const inpValue = e.target.value;
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if ((inpValue.trim().length = !regex.test(e.target.value))) {
    setErrors("Ingresa email válido", inp);
  } else {
    setErrors("", inp, false);
  }
};

const validate_password_inp = (e) => {
  const inp = e.target;
  const inpValue = e.target.value;
  const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/);

  if ((inpValue.trim().length = !regex.test(e.target.value))) {
    setErrors(
      "Utiliza mímino 8 caracteres, con al menos una letra mayúscula, números y símbolos",
      inp
    );
  } else {
    setErrors("", inp, false);
  }
};

//Implementación de validaciones con Expresiones regulares:

first_name_Inp.addEventListener("blur", validateNameInp);
last_name_Inp.addEventListener("blur", validateNameInp);
email_Inp.addEventListener("blur", validateEmail_format);
password_Inp.addEventListener("blur", validate_password_inp);
contact_number_Inp.addEventListener("blur", validateContact_numberInp);
birth_date_Inp.addEventListener("blur", validateBirth_date_Inp);

//validación datos completados exitosamente
first_name_Inp.addEventListener("input", validateNameInp);
last_name_Inp.addEventListener("input", validateNameInp);
email_Inp.addEventListener("input", validateEmail_format);
password_Inp.addEventListener("input", validate_password_inp);
contact_number_Inp.addEventListener("input", validateContact_numberInp);
birth_date_Inp.addEventListener("input", validateBirth_date_Inp);
