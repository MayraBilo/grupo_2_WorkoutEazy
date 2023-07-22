const path = require ('path');
const {body} = require ('express-validator')

const validationsAliados = [
    body('entity_name').notEmpty().withMessage('Escribir un nombre'),
    body('first_name').notEmpty().withMessage('Escribir un nombre'),
    body('last_name').notEmpty().withMessage('Escribir un apellido'),
    body('services').notEmpty().withMessage('Escribir un profesión o servicio'),
    body('genre').notEmpty().withMessage('Elegir un género'),
    body('document_number').notEmpty().withMessage('Escribir identificación'),
    body('birth_date').notEmpty().withMessage('Elegir una fecha de nacimiento'),
    body('contact_number').notEmpty().withMessage('Escribir número celular'),
    body('password').notEmpty().withMessage('Crear una contraseña'),
    body('email').notEmpty().withMessage('Escribir un email').bail()
    .isEmail().withMessage('Debes escribir un mail válido'),

    /*body('avatar').custom((value, {req}) => {
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
    }),*/

    body('condiciones').notEmpty().withMessage('Debes aceptar los términos y condiciones'),
    body('privacidad').notEmpty().withMessage('Debes aceptar las políticas de privacidad')
]

module.exports = validationsAliados;