const path = require ('path');
const {body} = require ('express-validator')

const validationsAliados = [
    body('nombreEmpresa').notEmpty().withMessage('Escribir un nombre'),
    body('nombre').notEmpty().withMessage('Escribir un nombre'),
    body('apellido').notEmpty().withMessage('Escribir un apellido'),
    body('profesion').notEmpty().withMessage('Escribir un profesión o servicio'),
    body('medio').notEmpty().withMessage('Elegir un género'),
    body('identificacion').notEmpty().withMessage('Escribir identificación'),
    body('nacimiento').notEmpty().withMessage('Elegir una fecha de nacimiento'),
    body('contacto').notEmpty().withMessage('Escribir número celular'),
    body('password').notEmpty().withMessage('Crear una contraseña'),
    body('email').notEmpty().withMessage('Escribir un email').bail()
    .isEmail().withMessage('Debes escribir un mail válido'),

    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
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

module.exports = validationsAliados;