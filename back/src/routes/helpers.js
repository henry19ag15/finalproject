//verifico que este autenticado
const helpers={}

//ver si esta logueado
helpers.isAuthenticated =function(req,res, next){
    if(req.isAuthenticated()){
        //si esta logeado
        return next();
    }
    res.redirect('/user')
}
//Verificar si es administrador
helpers.isAdmin =function(req,res,next){
 if(req.user.isAdmin){
     return next()
 }
 res.redirect('/user')
}

module.exports = helpers;