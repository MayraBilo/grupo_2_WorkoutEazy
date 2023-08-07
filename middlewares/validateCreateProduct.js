const path = require ('path');
const {body} = require ('express-validator')

const validations = [
    body('activity_name').notEmpty().withMessage('Escribir un nombre').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('image').custom((value, {req}) => {
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
    body('product_description').notEmpty().withMessage('Escribir una decripción').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('category').notEmpty().withMessage('Debe seleccionar una categoría'),
    body('subcategory').notEmpty().withMessage('Debe seleccionar una subcategoría'),
    body('aliado_id').notEmpty().withMessage('Debe escribir un nombre de aliado'),
    body('price').notEmpty().withMessage('Debe escribir un precio de producto'),
    body('spots').notEmpty().withMessage('Debe escribir la cantidad de cupos disponibles'),
    body('schedule').notEmpty().withMessage('Debe seleccionar el horario de la clase'),
    body('length').notEmpty().withMessage('Debe seleccionar una duración para la clase'),
    body('difficulty').notEmpty().withMessage('Debe seleccionar un nivel de dificultad'),
    body('adress').notEmpty().withMessage('Debe escribir una dirección completa'),
    body('city').notEmpty().withMessage('Debe seleccionar una ciudad'),
    body('age').notEmpty().withMessage('Debe seleccionar una edad'),
    body('mode').notEmpty().withMessage('Debe seleccionar un modo')
]

module.exports = validations;