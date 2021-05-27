// Express
const express = require('express');
const router = express.Router();
//const bcrypt = require("bcryptjs");

//Esquemas ahora se ponen en controles
//const ClientSchema = require("./Modelo/ClientSchema");
//const Client = require("./Modelo/Client");

//const AdminSchema = require("./Modelo/AdminSchema");
const ControlUsers = require('./Controladores/ControlUsers');
const DaoClient = require('./Controladores/DaoClient');
const FactoryAdmin = require('./Modelo/FactoryAdmin');
const FactoryClient = require('./Modelo/FactoryClient');
const FactoryInstructor = require('./Modelo/FactoryInstructor');
//const RoomSchema = require('./Modelo/RoomSchema');

//---------------Rutas----------------------//

//Crear Usuario
router.post("/NewClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const factory = new FactoryClient();
    const filter = {email: object.email};
    try {        
        const findUser = await control.find(filter, handler);
        if (findUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object.email,
            object.password,
            object.id,
            object.firstName,
            object.lastName,
            object.phone
        );
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.post("/NewInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient(); // Cambiar a DaoInstructors al hacerlo
    const factory = new FactoryInstructor();
    const filter = {email: object.email};
    try {        
        const findUser = await control.find(filter, handler);
        if (findUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object.email,
            object.password,
            object.id,
            object.firstName,
            object.lastName,
            object.phone
        );
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.post("/NewAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient(); // Cambiar a DaoAdmin al hacerlo
    const factory = new FactoryAdmin();
    const filter = {email: object.email};
    try {        
        const findUser = await control.find(filter, handler);
        if (findUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object.email,
            object.password,
            object.id,
            object.firstName,
            object.lastName,
            object.phone
        );
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;