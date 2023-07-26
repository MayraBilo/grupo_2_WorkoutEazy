function guestMiddleware (req, res, next) {
    if (req.session.userLogged && req.session.userLogged.rol !== "admin"){
        return res.redirect('/perfilCliente');
    }
    next();
    }
   
    module.exports = guestMiddleware;