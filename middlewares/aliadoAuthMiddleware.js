function aliadoAuthMiddleware (req, res, next) {
    if (!req.session.aliadoLogged){
        return res.redirect('/login');
    }
    next();
    }
    
    module.exports = aliadoAuthMiddleware;