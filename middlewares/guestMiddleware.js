function guestMiddleware (req, res, next) {
    if (req.session.userLogged){
        return res.redirect('/perfilCliente');
    }
    next();
    }
    
    module.exports = guestMiddleware;