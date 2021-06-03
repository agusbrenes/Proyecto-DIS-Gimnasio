// Express
const express = require('express');
const router = express.Router();
const config = require('./Config');
const jwt = require('jsonwebtoken');

// Token?
const { JWT_SECRET } = config;

// Controladores
const ControlUsers = require('./Controladores/ControlUsers');
const ControlService = require('./Controladores/ControlService');

// DAOs
const DaoClient = require('./Controladores/DaoClient');
const DaoInstructor = require('./Controladores/DaoInstructor');
const DaoAdmin = require('./Controladores/DaoAdmin');
const DaoService = require('./Controladores/DaoService');
const DaoSession = require('./Controladores/DaoSession');

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

//---------------Client----------------------//

//Crear Usuario
// Ya funciona
router.post("/NewClient", async (req, res) => {
    const object = req.body;
    const handler = new DaoClient();
    const control = new ControlUsers(handler);
    const factory = new FactoryClient();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
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
    const handler = new DaoClient();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
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
    const handler = new DaoClient();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
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
    const handler = new DaoClient();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.get("/GetClients", (req, res) => {    
    const handler = new DaoClient();
    const control = new ControlUsers(handler);
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

//---------------Instructor----------------------//

router.post("/NewInstructor", async (req, res) => {
    const object = req.body;
    const handler = new DaoInstructor();
    const control = new ControlUsers(handler);
    const factory = new FactoryInstructor();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
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
    const handler = new DaoInstructor();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
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
    const handler = new DaoInstructor();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
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
    const handler = new DaoInstructor();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.get("/GetInstructors", (req, res) => {    
    const handler = new DaoInstructor();
    const control = new ControlUsers(handler);
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

//---------------Admin----------------------//

router.post("/NewAdmin", async (req, res) => {
    const object = req.body;
    const handler = new DaoAdmin();
    const control = new ControlUsers(handler);
    const factory = new FactoryAdmin();
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (foundUser){
            return res.json({msg:true});
        }

        const savedUser = await control.save(
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
    const handler = new DaoAdmin();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
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
    const handler = new DaoAdmin();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
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
    const handler = new DaoAdmin();
    const control = new ControlUsers(handler);
    const filter = {email: object.email};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser){
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

//---------------Service----------------------//

router.post("/NewService", async (req, res) => {
    const object = req.body;
    const handler = new DaoService();
    const control = new ControlService(handler);
    const filter = {id: object.id};
    try {        
        const foundService = await control.find(filter);
        if (foundService){
            return res.json({msg:true});
        }

        const savedService = await control.save(object);
        res.json(savedService);
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
});

router.get("/GetServices", (req, res) => {    
    const handler = new DaoService();
    const control = new ControlService(handler);
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

module.exports = router;