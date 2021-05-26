// Express
const express = require('express');
const router = express.Router();

//Esquemas
const Client = require("./Modelo/Client")

//---------------Rutas----------------------//

//Crear Usuario
router.post("/NewClient", async (req, res) => {
    try {
        const findUser = await Usuario.findOne({email: req.body.email});
        if (findUser)
            return res
                .json({msg:true});
        

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new Usuario({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;