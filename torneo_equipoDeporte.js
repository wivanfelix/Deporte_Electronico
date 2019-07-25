var express = require('express');

module.exports = function tipoModule(model) {
    const torneo_equipoDeporteRouter = express.Router();



    torneo_equipoDeporteRouter.get('/torneo_equipoDeporte', function (req, res) {
        model.TorneoEquipoDeporte.findAll().then(function (torneo_equipoDeporte) {
            res.json(torneo_equipoDeporte);
        });
    });



    torneo_equipoDeporteRouter.get('/torneo_equipoDeporte/:id', function (req, res) {
        var id = req.params.id;
        model.TorneoEquipoDeporte.findOne({
            where: {
                id: id
            }
        }).then(function (torneo_equipoDeporte) {
            if (torneo_equipoDeporte) {
                res.json(torneo_equipoDeporte);
            } else {
                res.status(400).json();
            }
        });
    });


    torneo_equipoDeporteRouter.post('/torneo_equipoDeporte', function (req, res) {
        var input = req.body;
        model.TorneoEquipoDeporte.create(input).then(function (torneo_equipoDeporte) {
            res.json(torneo_equipoDeporte);

        });
    });


    torneo_equipoDeporteRouter.put('/torneo_equipoDeporte/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.TorneoEquipoDeporte.update({
            id_Torneo: input.id_Torneo,
            id_EquipoDeporte: input.id_EquipoDeporte
        }, {
                where: {
                    id: id
                }
            }).then(function (torneo_equipoDeporte) {
                res.json(torneo_equipoDeporte);
        });
    });


    torneo_equipoDeporteRouter.delete('/torneo_equipoDeporte/:id', function (req, res) {
        var id = req.params.id;
        model.TorneoEquipoDeporte.destroy({
            where: {
                id: id
            }
        }).then(function (torneo_equipoDeporte) {
            res.json(torneo_equipoDeporte);
        });
    });

    return torneo_equipoDeporteRouter;
};