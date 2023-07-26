function guestMiddlewareAliados (req, res, next) {
    if (req.session.userLogged && req.session.userLogged.rol == 'admin'){
        return res.redirect('/perfilAliado');
    }
    next();
    }
    
    module.exports = guestMiddlewareAliados;