var express = require('express');

module.exports = function tipoModule(model) {
    const equipoRouter = express.Router();

    equipoRouter.get('/equipos', function (req, res) {
        model.Equipo.findAll().then(function (equipos) {
            res.json(equipos);
        });
    });

    equipoRouter.get('/equipos/:id', function (req, res) {
        var id = req.params.id;
        model.Equipo.findOne({
            where: {
                id: id
            }
        }).then(function (equipo) {
            if (equipo) {
                res.json(equipo);
            } else {
                res.status(400).json();
            }
        });
    });


    equipoRouter.post('/equipos', function (req, res) {
        var input = req.body;
        model.Equipo.create(input).then(function (equipo) {
            res.json(equipo);

        });
    });


    equipoRouter.put('/equipos/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.Equipo.update({
            nombre_Equipo: input.nombre_Equipo,
            pais_Equipo: input.pais_Equipo
        }, {
                where: {
                    id: id
                }
            }).then(function (equipo) {
                res.json(equipo);
        });
    });


    equipoRouter.delete('/equipos/:id', function (req, res) {
        var id = req.params.id;
        model.Equipo.destroy({
            where: {
                id: id
            }
        }).then(function (equipo) {
            res.json(equipo);
        });
    });

    return equipoRouter;
};