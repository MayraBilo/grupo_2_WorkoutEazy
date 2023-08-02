const db = require('../database/models')

let userLoggedMiddleware = async (req, res ,next) => {
    try{
     res.locals.isLogged = false;
     
     if (req.session && req.session.userLogged) {
     res.locals.isLogged = true;
     res.locals.userLogged = req.session.userLogged;
      }

     let emailInCookie = req.cookies.userEmail;
     console.log(emailInCookie);
     // undefined

     let userFromCookie =  await db.Cliente.findOne({where: {email: emailInCookie}}) 
     
     if(userFromCookie) {
          req.session.userLogged = userFromCookie
     }
     
     next()
    } catch (error){
        res.json(error)
    }
}

module.exports = userLoggedMiddleware;