// Express
const express = require('express');
const router = express.Router();
const config = require('./Config');
const jwt = require('jsonwebtoken');

// Token?
const { JWT_SECRET } = config;

// Controladores
const ControlAdmin = require('./Control/Controladores/ControlAdmin');
const ControlInstructor = require('./Control/Controladores/ControlInstructor');
const ControlClient = require('./Control/Controladores/ControlClient');
const ControlRoom = require('./Control/Controladores/ControlRoom');
const ControlService = require('./Control/Controladores/ControlService');

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
    const control = new ControlClient();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        console.log(foundUser);
        if (foundUser.length != 0) {
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            object
        );
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/GetClient", async (req, res) => {
    const object = req.body; 
    const control = new ControlClient();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        
        res.json(foundUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/ModifyClient", async (req, res) => {
    const object = req.body; 
    const control = new ControlClient();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        
        const modifiedUser = await control.modify(
            filter, 
            object
        );
        res.json(modifiedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/DeleteClient", async (req, res) => {
    const object = req.body; 
    const control = new ControlClient();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetClients", (req, res) => {    
    const control = new ControlClient();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

//Hecho por Eduardo, puede no funcionar
router.post("/ReserveSession", async (req, res) => {
    const control = new ControlClient();
    const object = req.body;
    try {
        const reservationSuccess = await control.reserveSession(object.idClient, object.idSession);
        res.json(reservationSuccess);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Hecho por Eduardo, puede no funcionar
router.post("/PayReservation", async (req, res) => {
    const control = new ControlClient();
    const object = req.body;
    try {
        const paymentSuccess = await control.payReservation(object.idClient, object.idSession, object.idPayMethod);
        res.json(paymentSuccess);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Hecho por Eduardo, puede no funcionar
router.post("/GetClientReservation", (req, res) => {
    const control = new ControlClient();
    const object = req.body;
    const filter = {id: object.idClient};
    try {
        const foundUser = await control.find(filter);
        if(!foundUser) {
            return res.json({msg:true});
        }
        const clientReservations = await control.getClientReservations(object.idClient);
        res.json(clientReservations);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------Instructor----------------------//

router.post("/NewInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlInstructor();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (foundUser.length != 0) {
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            object
        );
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/GetInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlInstructor();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        res.json(foundUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/ModifyInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlInstructor();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
            object
        );
        res.json(modifiedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/DeleteInstructor", async (req, res) => {
    const object = req.body;
    const control = new ControlInstructor();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetInstructors", (req, res) => {   
    const control = new ControlInstructor();
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
    const control = new ControlAdmin();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (foundUser.length != 0) {
            return res.json({msg:true});
        }

        const savedUser = await control.save(
            object
        );
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/GetAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlAdmin();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        res.json(foundUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/ModifyAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlAdmin();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }

        const modifiedUser = await control.modify(
            filter, 
            object
        );
        res.json(modifiedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Ya funciona
router.post("/DeleteAdmin", async (req, res) => {
    const object = req.body;
    const control = new ControlAdmin();
    const filter = {id: object.id};
    try {        
        const foundUser = await control.find(filter);
        if (!foundUser) {
            return res.json({msg:true});
        }
        const deletedUser = await control.delete(filter);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetAdmins", (req, res) => {    
    const control = new ControlAdmin();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

//---------------Service----------------------//

router.post("/NewRoom", async (req, res) => {
    const object = req.body;
    const control = new ControlRoom();
    const filter = {name: object.name};
    try {        
        const foundRoom = await control.find(filter);
        if (foundRoom.length != 0) {
            return res.json({msg:true});
        }

        const savedRoom = await control.save(object);
        res.json(savedRoom);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetRooms", (req, res) => {  
    const control = new ControlRoom();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

//---------------Service----------------------//

router.post("/NewService", async (req, res) => {
    const object = req.body;
    const control = new ControlService();
    const filter = {id: object.id};
    try {        
        const foundService = await control.find(filter);
        if (foundService.length != 0) {
            return res.json({msg:true});
        }

        const savedService = await control.save(object);
        res.json(savedService);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetServices", (req, res) => {  
    const control = new ControlService();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });    
});

module.exports = router;