// Express
const express = require('express');
const router = express.Router();
//const bcrypt = require("bcryptjs");

//Esquemas ahora se ponen en controles
//const ClientSchema = require("./Modelo/ClientSchema");
//const Client = require("./Modelo/Client");

const AdminSchema = require("./Modelo/AdminSchema");
const ControlRegister = require('./Controladores/ControlRegister');
//const RoomSchema = require('./Modelo/RoomSchema');

//---------------Rutas----------------------//

//Crear Usuario
router.post("/NewClient", async (req, res) => {
    const object = req.body;
    const control = new ControlRegister();
    try {
        const filter = {email: object.email};
        const findUser = await control.findClient(filter);
        if (findUser){
            return res.json({msg:true});
        }

        const savedUser = await control.saveClient(
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