// Express
const express = require('express');
const router = express.Router();
const config = require('./Config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = config;

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

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Llene todos los campos' });
    }
  
    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) throw Error('User does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });


//Crear Usuario
router.post("/NewClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const factory = new FactoryClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object
        );
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.get("/GetClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }
        res.json(foundUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const factory = new FactoryClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            handler,
            //factory,
            object
        );
        res.json(modifiedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter, handler);
        res.json(deletedUser);
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
        const foundUser = await control.find(filter, handler);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object
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
        const foundUser = await control.find(filter, handler);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            handler,
            factory,
            object
        );
        res.json(savedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;