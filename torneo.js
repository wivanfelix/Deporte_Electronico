var express = require('express');

module.exports = function tipoModule(model) {
    const torneoRouter = express.Router();

    torneoRouter.get('/torneos', function (req, res) {
        model.Torneo.findAll().then(function (torneos) {
            res.json(torneos);
        });
    });

    torneoRouter.get('/torneos/:id', function (req, res) {
        var id = req.params.id;
        model.Torneo.findOne({
            where: {
                id: id
            }
        }).then(function (torneo) {
            if (torneo) {
                res.json(torneo);
            } else {
                res.status(400).json();
            }
        });
    });


    torneoRouter.post('/torneos', function (req, res) {
        var input = req.body;
        model.Torneo.create(input).then(function (torneo) {
            res.json(torneo);

        });
    });


    torneoRouter.put('/torneos/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.Torneo.update({
            nombre_Torneo: input.nombre_Torneo,
            administrador_Torneo: input.administrador_Torneo
        }, {
                where: {
                    id: id
                }
            }).then(function (torneo) {
                res.json(torneo);
        });
    });


    torneoRouter.delete('/torneos/:id', function (req, res) {
        var id = req.params.id;
        model.Torneo.destroy({
            where: {
                id: id
            }
        }).then(function (torneo) {
            res.json(torneo);
        });
    });

    return torneoRouter;
};