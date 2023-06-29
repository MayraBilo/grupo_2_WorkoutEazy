const user = require('../models/aliado')

function aliadoLoggedMiddleware (req, res, next) {
     if(req.cookies.email){
         const aliadoModel = require('./models/aliado');
 
         const aliado = aliadoModel.findByEmail(req.cookies.email);
 
         delete aliado.id;
         delete aliado.password;
 
         req.session.aliado = aliado;
     }
 
     next();
 };

module.exports = aliadoLoggedMiddleware;