var express = require('express');

module.exports = function tipoModule(model) {
    const paisRouter = express.Router();

    paisRouter.get('/paises', function (req, res) {
        model.Pais.findAll().then(function (paises) {
            res.json(paises);
        });
    });

    paisRouter.get('/paises/:id', function (req, res) {
        var id = req.params.id;
        model.Pais.findOne({
            where: {
                id: id
            }
        }).then(function (pais) {
            if (pais) {
                res.json(pais);
            } else {
                res.status(400).json();
            }
        });
    });


    paisRouter.post('/paises', function (req, res) {
        var input = req.body;
        model.Pais.create(input).then(function (pais) {
            res.json(pais);

        });
    });


    paisRouter.put('/paises/:id', function (req, res) {
        var input = req.body;
        var id = req.params.id;
        model.Pais.update({
            nombre_Pais: input.nombre_Pais
        }, {
                where: {
                    id: id
                }
            }).then(function (pais) {
                res.json(pais);
        });
    });


    paisRouter.delete('/paises/:id', function (req, res) {
        var id = req.params.id;
        model.Pais.destroy({
            where: {
                id: id
            }
        }).then(function (pais) {
            res.json(pais);
        });
    });

    return paisRouter;
};