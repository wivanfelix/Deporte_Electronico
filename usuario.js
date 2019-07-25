var express = require('express');

module.exports = function userModule(model) {
    const userRouter = express.Router();

    userRouter.get('/usuarios', function (req, res) {
        model.Usuario.findAll().then(function (usuarios) {
            res.json(usuarios);
        });
    });

    userRouter.get('/usuarios/:id', function (req, res) {
        var id = req.params.id;
        model.Usuario.findOne(id).then(function(usuario){
            if(usuario){
                res.json(usuario);
            }else{
                res.status(400).json();
            }
        });
        });


    userRouter.post('/usuarios', function (req, res) {
            var input = req.body;
            model.Usuario.create(input).then(function (usuario) {
                res.json(usuario);
                
            });
        });


    userRouter.put('/usuarios', function (req, res) {
        var input = req.body;
        var input = req.params.id;
        model.Usuario.update(input,{
            where:{
                id: id
            }
        }).then(function(usuario){
            res.json(usuario);
        });


        model.Usuario.create(inpu).then(function(usuario){
            res.json(usuario);
        });
    });


    userRouter.delete('/usuarios/:id', function (req, res) {
        var id = req.params.id;
        model.Usuario.destroy(id).then(function(usuario){
            res.json(usuario);
        });
    });

    return userRouter;
};