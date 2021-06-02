// Express
const express = require('express');
const router = express.Router();
const config = require('./Config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = config;

// Controladores
const ControlUsers = require('./Controladores/ControlUsers');

// DAOs
const DaoClient = require('./Controladores/DaoClient');
const DaoInstructor = require('./Controladores/DaoInstructor');
const DaoAdmin = require('./Controladores/DaoAdmin');

// Factories - Patron Creacional
const FactoryAdmin = require('./Modelo/FactoryAdmin');
const FactoryClient = require('./Modelo/FactoryClient');
const FactoryInstructor = require('./Modelo/FactoryInstructor');

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
// Ya funciona
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

// Ya funciona
router.post("/GetClient", async (req, res) => {
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

// Ya funciona
router.post("/ModifyClient", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
            handler,
            object
        );
        res.json(modifiedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
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
    const handler = new DaoInstructor();
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

// Ya funciona
router.post("/GetInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoInstructor();
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

// Ya funciona
router.post("/ModifyInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoInstructor();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
            handler,
            object
        );
        res.json(modifiedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/DeleteInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoInstructor();
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

router.post("/NewAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoAdmin();
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

// Ya funciona
router.post("/GetAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoAdmin();
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

// Ya funciona
router.post("/ModifyAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoAdmin();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter, handler);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
            handler,
            object
        );
        res.json(modifiedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/DeleteAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlUsers();
    const handler = new DaoAdmin();
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

module.exports = router;