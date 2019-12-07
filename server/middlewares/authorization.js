const Project = require('../models/projects')

module.exports = (req,res,next)=>{
    Project.findOne({_id:req.params.id})
    .then(project => {
        if(project.userId == req.loggedUser.id){
            next()
        }else{
            next({
                status : 401,
                message : 'unauthorized user'
            })
        }
    }) 
    .catch(err => {
        next()
    })
}