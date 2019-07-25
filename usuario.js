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
        model.Usuario.findOne({
            where: {
                id: id
            }
        }).then(function (usuario) {
            if (usuario) {
                res.json(usuario);
            } else {
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


        userRouter.put('/usuarios/:id', function (req, res) {
            var input = req.body;
            var id = req.params.id;
            model.Usuario.update({
                nombre_Usuario: input.nombre_Usuario,
                edad_Usuario: input.edad_Usuario,
                usuario_Usuario: input.usuario_Usuario,
                contrasena_Usuario: input.contrasena_Usuario,
                tipo_usuario: input.tipo_usuario,
                pais_Usuario: input.pais_Usuario
            }, {
                    where: {
                        id: id
                    }
                }).then(function (usuario) {
                    res.json(usuario);
            });
        });


    userRouter.delete('/usuarios/:id', function (req, res) {
        var id = req.params.id;
        model.Usuario.destroy({
            where: {
                id: id
            }
        }).then(function(usuario){
            res.json(usuario);
        });
    });

    return userRouter;
};