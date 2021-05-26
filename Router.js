// Express
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

//Esquemas
const Client = require("./Modelo/Client")

//---------------Rutas----------------------//

//Crear Usuario
router.post("/NewClient", async (req, res) => {
    try {
        
        const findUser = await Client.findOne({email: req.body.email});
        if (findUser){
            return res
                .json({msg:true});
        }
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        
        console.log(req.body);
        console.log(passwordHash);
        const newUser = new Client({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            id: req.body.id,
            phone: req.body.phone,
            password: passwordHash
        });
        console.log(newUser);
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;