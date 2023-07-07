function authMiddlewareAliado (req, res, next) {
    if (!req.session.aliadoLogged){
        return res.redirect('/loginAliado');
    }
    next();
    }
    
    module.exports = authMiddlewareAliado;