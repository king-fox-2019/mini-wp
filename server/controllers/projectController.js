const Project = require('../models/projects')

class ProjectController {
    static createProject(req,res,next){
        console.log('trigerred?')
        console.log(req.body)
        
        Project.create({
            title : req.body.title,
            description : req.body.description,
            tags : req.body.tags,
            userId : req.loggedUser._id,
            images: req.body.files
        })
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static findByUserId(req,res,next){
        Project.find({
            userId : req.loggedUser._id
        })
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            next()
            console.log(err)
        })
    }

    static findOne(req,res,next){
        Project.findOne({
            _id:req.params.id
        })
        .then(project => {
           
            res.status(200).json(project)
        })
        .catch(err =>{
            next()
            
        })

    }

    static showAll(req,res,next){ 
        
        Project.find()
                .populate('userId')
                .then(projects => {
                    res.status(200).json(projects)
                })
                .catch(err => {
                    console.log(err)
                    next()
                })
        }

    static deleteProject(req,res,next){
        Project.findOneAndDelete({
            _id : req.params.id
        })
        .then(project => { 
            res.status(200).json({message : `succesfully delete projects : ${project.title}`})
        })
        .catch(next)
    }

    static updateProject(req,res,next){
        const {id} = req.params
        const {title,description,tags,images} = req.body
        const project = {title,description,tags,images}
        Project.findOneAndUpdate({_id:id}, project, {new : true})
            .then(project => {
                if(!project){
                    res.status(404).json({message : 'project is not found'})
                }else{
                    res.status(200).json(project)
                }
            })
            .catch(next)
    }
}

module.exports = ProjectController