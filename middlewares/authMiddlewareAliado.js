function authMiddlewareAliado (req, res, next) {
    if (req.session.userLogged.rol !== 'admin'){
        return res.redirect('/loginAliado');
    }
    next();
    }
    
    module.exports = authMiddlewareAliado;