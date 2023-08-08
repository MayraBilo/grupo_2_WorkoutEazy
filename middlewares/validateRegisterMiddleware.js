const path = require ('path');
const {body} = require ('express-validator')
const db = require("../database/models");  

const validations = [
    body('first_name').notEmpty().withMessage('Escribir un nombre').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Escribir un apellido').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('contact_number').notEmpty().withMessage('Escribir información de contacto'),
    body('password').notEmpty().withMessage('Crear una contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
    body('city').notEmpty().withMessage('Elegir una ciudad de residencia'),
    body('genre').notEmpty().withMessage('Elegir un género'),
    body('birth_date').notEmpty().withMessage('Elegir una fecha de nacimiento'),
    body('email').notEmpty().withMessage('Escribir un email').bail()
    .isEmail().withMessage('Debes escribir un mail válido').custom(async (value) => {
        const existingClient = await db.Cliente.findOne({ where: { email: value } });
        if (existingClient) {
          throw new Error('El correo electrónico ya está registrado');
        }
        return true;
      }),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.gif'];
        
        if(!file) {
            throw new Error('Subir una imagen')
        } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error ('Las extensiones permitidas son: ' + acceptedExtensions)
        }
        };
        return true;
    }),
    body('condiciones').notEmpty().withMessage('Debes aceptar los términos y condiciones'),
    body('privacidad').notEmpty().withMessage('Debes aceptar las políticas de privacidad')
]

module.exports = validations;