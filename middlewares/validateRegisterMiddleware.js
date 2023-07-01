const path = require ('path');
const {body} = require ('express-validator')

const validations = [
    body('nombre').notEmpty().withMessage('Escribir un nombre'),
    body('apellido').notEmpty().withMessage('Escribir un apellido'),
    body('contacto').notEmpty().withMessage('Escribir información de contacto'),
    body('usuario').notEmpty().withMessage('Elegir un nombre de usuario'),
    body('password').notEmpty().withMessage('Crear una contraseña'),
    body('ciudad').notEmpty().withMessage('Elegir una ciudad de residencia'),
    body('medio').notEmpty().withMessage('Elegir un género'),
    body('nacimiento').notEmpty().withMessage('Elegir una fecha de nacimiento'),
    body('direccion').notEmpty().withMessage('Brindar un domicilio de facturación'),
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

module.exports = validations;