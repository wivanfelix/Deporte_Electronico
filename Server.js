var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Sequelize = require('sequelize');
const sequelize = new Sequelize('deportes_electronicos', 'root', '', {
    dialect: 'mysql'
});

var model = {};
model.sequelize = sequelize;

model.Deporte = sequelize.define('Deporte', {
    nombre_Deporte: { type: Sequelize.STRING, allowNull: false },
    descripcion_Deporte: { type: Sequelize.STRING, allowNull: false }
});

model.Equipo = sequelize.define('Equipo', {
    nombre_Equipo: { type: Sequelize.STRING, allowNull: false },
    pais_Equipo: { type: Sequelize.INTEGER, allowNull: false }
});

model.EquipoDeporte = sequelize.define('Equipo_Deporte', {
    id_Equipo: { type: Sequelize.INTEGER, allowNull: false },
    id_Deporte: { type: Sequelize.INTEGER, allowNull: false },
    id_Usuario: { type: Sequelize.INTEGER, allowNull: false }

});

model.Usuario = sequelize.define('Usuario', {
    nombre_Usuario: { type: Sequelize.STRING, allowNull: false },
    edad_Usuario: { type: Sequelize.INTEGER, allowNull: false },
    usuario_Usuario: { type: Sequelize.STRING, allowNull: false },
    contrasena_Usuario: { type: Sequelize.STRING, allowNull: false },
    tipo_Usuario: { type: Sequelize.INTEGER, allowNull: false },
    pais_Usuario: { type: Sequelize.INTEGER, allowNull: false }
});

model.Tipo = sequelize.define('Tipo', {
    nombre_Tipo: { type: Sequelize.STRING, allowNull: false }
});

model.Pais = sequelize.define('Pais', {
    nombre_Pais: { type: Sequelize.STRING, allowNull: false }
});

model.Torneo = sequelize.define('Torneo', {
    nombre_Torneo: { type: Sequelize.STRING, allowNull: false },
    administrador_Torneo: { type: Sequelize.INTEGER, allowNull: false },
});

model.TorneoEquipoDeporte = sequelize.define('Torneo_EquipoDeporte', {
    id_Torneo: { type: Sequelize.INTEGER, allowNull: false },
    id_EquipoDeporte: { type: Sequelize.INTEGER, allowNull: false },
});

model.Equipo.hasMany(model.EquipoDeporte);
model.EquipoDeporte.belongsTo(model.Equipo);

model.Deporte.hasMany(model.EquipoDeporte);
model.EquipoDeporte.belongsTo(model.Tipo);

model.Torneo.hasMany(model.TorneoEquipoDeporte);
model.TorneoEquipoDeporte.belongsTo(model.Torneo);

model.EquipoDeporte.hasMany(model.TorneoEquipoDeporte);
model.TorneoEquipoDeporte.belongsTo(model.EquipoDeporte);

model.EquipoDeporte.hasMany(model.Usuario);
model.Usuario.belongsTo(model.EquipoDeporte);

model.Usuario.hasMany(model.Torneo);
model.Torneo.belongsTo(model.Usuario);

model.Pais.hasMany(model.Equipo);
model.Equipo.belongsTo(model.Pais);

model.Pais.hasMany(model.Usuario);
model.Usuario.belongsTo(model.Pais);

model.Tipo.hasMany(model.Usuario);
model.Usuario.belongsTo(model.Tipo);

sequelize.sync();


app.use('/', require('./usuario')(model));
app.use('/', require('./tipo')(model));
app.use('/', require('./deporte')(model));
app.use('/', require('./torneo')(model));
app.use('/', require('./pais')(model));
app.use('/', require('./equipo')(model));
app.use('/', require('./equipo_deporte')(model));
//app.use('/', require('./torneo_equipoDeporte')(model));

/* 
app.get('/usuarios', function (req, res) {
    model.Usuario.findAll().then(function (usuarios) {
        res.json(usuarios);
    });
});

app.get('/usuarios/:id', function (req, res) {
    model.Usuario.findOne().then(function (usuarios) {
        res.json(usuarios);
    });
});

app.post('/usuarios', function (req, res) {
    model.Usuario.findAll().then(function (usuarios) {
        res.json(usuarios);
    });
});

app.put('/usuarios', function (req, res) {
    model.Usuario.findAll().then(function (usuarios) {
        res.json(usuarios);
    });
});

app.delete('/usuarios', function (req, res) {
    model.Usuario.findAll().then(function (usuarios) {
        res.json(usuarios);
    });
});

 */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
