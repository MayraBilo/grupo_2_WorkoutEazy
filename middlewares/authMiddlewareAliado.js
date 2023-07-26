function authMiddlewareAliado (req, res, next) {
    if (!req.session.userLogged){
        return res.redirect('/loginAliado');
    }
    next();
    }
    
    module.exports = authMiddlewareAliado;