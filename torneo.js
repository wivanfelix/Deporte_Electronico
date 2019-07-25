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
            nombre_Deporte: input.nombre_Deporte,
            descripcion_Deporte: input.descripcion_Deporte
        }, {
                where: {
                    id: id
                }
            }).then(function (deporte) {
                res.json(deporte);
        });
    });


    torneoRouter.delete('/deportes/:id', function (req, res) {
        var id = req.params.id;
        model.Deporte.destroy({
            where: {
                id: id
            }
        }).then(function (deporte) {
            res.json(deporte);
        });
    });

    return torneoRouter;
};