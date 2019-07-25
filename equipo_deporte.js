var express = require('express');

module.exports = function tipoModule(model) {
    const equipo_deporteRouter = express.Router();

    equipo_deporteRouter.get('/equipos_deporte', function (req, res) {
        model.EquipoDeporte.findAll().then(function (equipos_deporte) {
            res.json(equipos_deporte);
        });
    });

    equipo_deporteRouter.get('/equipos_deporte/:id', function (req, res) {
        var id = req.params.id;
        model.EquipoDeporte.findOne({
            where: {
                id: id
            }
        }).then(function (equipo_deporte) {
            if (equipo_deporte) {
                res.json(equipo_deporte);
            } else {
                res.status(400).json();
            }
        });
    });


    equipo_deporteRouter.post('/equipos_deporte', function (req, res) {
        var input = req.body;
        model.EquipoDeporte.create(input).then(function (equipo_deporte) {
            res.json(equipo_deporte);

        });
    });


    equipo_deporteRouter.put('/equipos_deporte/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.EquipoDeporte.update({
            id_Equipo: input.id_Equipo,
            id_Deporte: input.id_Deporte,
            id_Usuario: input.id_Usuario
        }, {
                where: {
                    id: id
                }
            }).then(function (equipo_deporte) {
                res.json(equipo_deporte);
        });
    });


    equipo_deporteRouter.delete('/equipos_deporte/:id', function (req, res) {
        var id = req.params.id;
        model.EquipoDeporte.destroy({
            where: {
                id: id
            }
        }).then(function (equipo_deporte) {
            res.json(equipo_deporte);
        });
    });

    return equipo_deporteRouter;
};