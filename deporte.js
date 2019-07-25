var express = require('express');

module.exports = function tipoModule(model) {
    const deporteRouter = express.Router();

    deporteRouter.get('/deportes', function (req, res) {
        model.Deporte.findAll().then(function (deportes) {
            res.json(deportes);
        });
    });

    deporteRouter.get('/deportes/:id', function (req, res) {
        var id = req.params.id;
        model.Deporte.findOne({
            where: {
                id: id
            }
        }).then(function (deporte) {
            if (deporte) {
                res.json(deporte);
            } else {
                res.status(400).json();
            }
        });
    });


    deporteRouter.post('/deportes', function (req, res) {
        var input = req.body;
        model.Deporte.create(input).then(function (deporte) {
            res.json(deporte);

        });
    });


    deporteRouter.put('/deportes/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.Deporte.update({
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


    deporteRouter.delete('/deportes/:id', function (req, res) {
        var id = req.params.id;
        model.Deporte.destroy({
            where: {
                id: id
            }
        }).then(function (deporte) {
            res.json(deporte);
        });
    });

    return deporteRouter;
};