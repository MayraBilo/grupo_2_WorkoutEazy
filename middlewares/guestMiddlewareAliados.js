function guestMiddlewareAliados (req, res, next) {
    if (req.session.aliadoLogged){
        return res.redirect('/perfilAliado');
    }
    next();
    }
    
    module.exports = guestMiddlewareAliados;