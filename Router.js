// Express
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

//Esquemas
const ClientSchema = require("./Modelo/ClientSchema");
const Client = require("./Modelo/Client");

//---------------Rutas----------------------//

//Crear Usuario
router.post("/NewClient", async (req, res) => {
    const object = req.body;
    try {        
        const findUser = await ClientSchema.findOne({email: object.email});
        if (findUser){
            return res
                .json({msg:true});
        }
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(object.password, salt);
        
        console.log(passwordHash);
        const client = new Client(
            object.email,
            passwordHash,
            object.id,
            object.firstName,
            object.lastName,
            object.phone
        );
        console.log(client);
        const newUser = client.toMongoSchema();
        console.log("Client.toSchema(): \n" + newUser);
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;