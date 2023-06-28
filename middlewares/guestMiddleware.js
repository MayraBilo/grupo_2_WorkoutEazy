function guestMiddleware (req, res, next) {
    if (req.session.userLogged){
        return res.redirect('/perfilCliente');
    }
    next();
    }
    function guestMiddleware (req, res, next) {
        if (req.session.aliadoLogged){
            return res.redirect('/perfilAliado');
        }
        next();
        }
    
    module.exports = guestMiddleware;