var express = require('express');

module.exports = function tipoModule(model) {
    const tipoRouter = express.Router();

    tipoRouter.get('/tipos', function (req, res) {
        model.Tipo.findAll().then(function (tipo) {
            res.json(tipo);
        });
    });

    tipoRouter.get('/tipos/:id', function (req, res) {
        var id = req.params.id;
        model.Tipo.findOne({
            where: {
                id: id
            }
        }).then(function (tipo) {
            if (tipo) {
                res.json(tipo);
            } else {
                res.status(400).json();
            }
        });
    });


    tipoRouter.post('/tipos', function (req, res) {
        var input = req.body;
        model.Tipo.create(input).then(function (tipo) {
            res.json(tipo);

        });
    });


    tipoRouter.put('/tipos/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.Tipo.update({
            nombre_Tipo: input.nombre_Tipo
        }, {
                where: {
                    id: id
                }
            }).then(function (tipo) {
                res.json(tipo);
        });
    });


    tipoRouter.delete('/tipos/:id', function (req, res) {
        var id = req.params.id;
        model.Tipo.destroy({
            where: {
                id: id
            }
        }).then(function (tipo) {
            res.json(tipo);
        });
    });

    return tipoRouter;
};