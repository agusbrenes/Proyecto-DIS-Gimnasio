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
const ControlPayMethod = require('./Control/Controladores/ControlPayMethod');
const ControlReservation = require('./Control/Controladores/ControlReservation');
const ControlSession = require('./Control/Controladores/ControlSession');
const ControlSubscription = require('./Control/Controladores/ControlSubscription');
const ControlCalendar = require('./Control/Controladores/ControlCalendar');
const ControlSchedule = require('./Control/Controladores/ControlSchedule');
const ControlDay = require('./Control/Controladores/ControlDay');

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
router.post("/GetClientReservation", async (req, res) => {
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

//---------------Rooms----------------------//

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

router.post("/GetRoom", async (req, res) => {
    const object = req.body;
    const control = new ControlRoom();
    const filter = {name: object.name};
    try {
        const foundRoom = await control.find(filter);
        if (!foundRoom) {
            return res.json({msg:true});
        }
        res.json(foundRoom);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyRoom", async (req, res) => {
    const object = req.body;
    const control = new ControlRoom();
    const filter = {name: object.name};
    try {
        const foundRoom = await control.find(filter);
        if (!foundRoom) {
            return res.json({msg:true});
        }

        const modifiedRoom = await control.modify(
            filter,
            object
        );
        res.json(modifiedRoom);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteRoom", async (req, res) => {
    const object = req.body;
    const control = new ControlRoom();
    const filter = {name: object.name};
    try {
        const foundRoom = await control.find(filter);
        if (!foundRoom) {
            return res.json({msg:true});
        }

        const deletedRoom = await control.delete(filter);
        res.json(deletedRoom);
    } catch (err) {
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

router.post("/GetService", async (req, res) => {
    const object = req.body;
    const control = new ControlService();
    const filter = {description: object.description};
    try {
        const foundService = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }
        res.json(foundService);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyService", async (req, res) => {
    const object = req.body;
    const control = new ControlService();
    const filter = {description: object.description};
    try {
        const foundService = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }

        const modifiedService = await control.modify(
            filter,
            object
        );
        res.json(modifiedService);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteService", async (req, res) => {
    const object = req.body;
    const control = new ControlService();
    const filter = {description: object.description};
    try {
        const foundService = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }

        const deletedService = await control.delete(filter);
        res.json(deletedService);
    } catch (err) {
        res.status(500).json({msg: err.message});
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

//---------------PayMethod----------------------//
router.post("/NewPayMethod", async (req, res) => {
    const object = req.body;
    const control = new ControlPayMethod();
    const filter = {id: object.id};
    try {
        const foundPayMethod = await control.find(filter);
        if (foundPayMethod != 0) {
            return res.json({msg:true});
        }

        const savedPayMethod = await control.save(savedPayMethod);
        res.json(savedPayMethod);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetPayMethod", async (req, res) => {
    const object = req.body;
    const control = new ControlPayMethod();
    const filter = {id: object.id};
    try {
        const foundPayMethod = await control.find(filter);
        if (!foundPayMethod) {
            return res.json({msg:true});
        }
        res.json(foundPayMethod);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyPayMethod", async (req, res) => {
    const object = req.body;
    const control = new ControlPayMethod();
    const filter = {id: object.id};
    try {
        const foundPayMethod = await control.find(filter);
        if (!foundPayMethod) {
            return res.json({msg:true});
        }

        const modifiedPayMethod = await control.modify(
            filter,
            object
        );
        res.json(modifiedPayMethod);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeletePayMethod", async (req, res) => {
    const object = req.body;
    const control = new ControlPayMethod();
    const filter = {id: object.id};
    try {
        const foundPayMethod = await control.find(filter);
        if (!foundPayMethod) {
            return res.json({msg:true});
        }

        const deletedPayMethod = await control.delete(filter);
        res.json(deletedPayMethod);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/GetPayMethods", (req, res) => {
    const control = new ControlPayMethod();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Reservation----------------------//
router.post("/NewReservation", async (req, res) => {
    const object = req.body;
    const control = new ControlReservation();
    const filter = {id: object.id};
    try {
        const foundReservation = await control.find(filter);
        if (foundReservation.length != 0) {
            return res.json({msg:true});
        }

        const savedReservation = await control.save(object);
        res.json(savedReservation);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetReservation", async (req, res) => {
    const object = req.body;
    const control = new ControlReservation();
    const filter = {id: object.id};
    try {
        const foundReservation = await control.find(filter);
        if (!foundReservation) {
            return res.json({msg:true});
        }
        res.json(foundReservation);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyReservation", async (req, res) => {
    const object = req.body;
    const control = new ControlReservation();
    const filter = {id: object.id};
    try {
        const foundReservation = await control.find(filter);
        if (!foundReservation) {
            return res.json({msg:true});
        }

        const modifiedReservation = await control.modify(
            filter,
            object
        );
        res.json(modifiedReservation);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteReservation", async (req, res) => {
    const object = req.body;
    const control = new ControlReservation();
    const filter = {id: object.id};
    try {
        const foundReservation = await control.find(filter);
        if (!foundReservation) {
            return res.json({msg:true});
        }

        const deletedReservation = await control.delete(filter);
        res.json(deletedReservation);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/GetReservations", (req, res) => {
    const control = new ControlReservation();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Session----------------------//
router.post("/NewSession", async (req, res) => {
    const object = req.body;
    const control = new ControlSession();
    const filter = {id: object.id};
    try {
        const foundSession = await control.find(filter);
        if (foundSession.length != 0) {
            return res.json({msg:true});
        }

        const savedSession = await control.save(object);
        res.json(savedSession);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetSession", async (req, res) => {
    const object = req.body;
    const control = new ControlSession();
    const filter = {id: object.id};
    try {
        const foundSession = await control.find(filter);
        if (!foundSession) {
            return res.json({msg:true});
        }
        res.json(foundSession);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifySession", async (req, res) => {
    const object = req.body;
    const control = new ControlSession();
    const filter = {id: object.id};
    try {
        const foundSession = await control.find(filter);
        if (!foundSession) {
            return res.json({msg:true});
        }

        const modifiedSession = await control.modify(
            filter,
            object
        );
        res.json(modifiedSession);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteSession", async (req, res) => {
    const object = req.body;
    const control = new ControlSession();
    const filter = {id: object.id};
    try {
        const foundService = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }

        const deletedSession = await control.delete(filter);
        res.json(deletedSession);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.get("/GetSessions", (req, res) => {
    const control = new ControlSession();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Subscription----------------------//
router.post("/NewSubscription", async (req, res) => {
    const object = req.body;
    const control = new ControlSubscription();
    const filter = {id: object.id};
    try {
        const foundSubscription = await control.find(filter);
        if (foundSubscription.length != 0) {
            return res.json({msg:true});
        }

        const savedSubscription = await control.save(object);
        res.json(savedSubscription);
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
});

router.post("/GetSubscription", async (req, res) => {
    const object = req.body;
    const control = new ControlSubscription();
    const filter = {id: object.id};
    try {
        const foundSubscription = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }
        res.json(foundSubscription);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifySubscription", async (req, res) => {
    const object = req.body;
    const control = new ControlSubscription();
    const filter = {id: object.id};
    try {
        const foundSubscription = await control.find(filter);
        if (!foundService) {
            return res.json({msg:true});
        }

        const modifiedSubscription = await control.modify(
            filter,
            object
        );
        res.json(modifiedSubscription);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteSubscription", async (req, res) => {
    const object = req.body;
    const control = new ControlSubscription();
    const filter = {id: object.id};
    try {
        const foundSubscription = await control.find(filter);
        if (!foundSubscription) {
            return res.json({msg:true});
        }

        const deletedSubscription = await control.delete(filter);
        res.json(deletedSubscription);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetSubscriptions", (req, res) => {
    const control = new ControlSubscription();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Calendar----------------------//
router.post("/NewCalendar", async (req, res) => {
    const object = req.body;
    const control = new ControlCalendar();
    const filter = {id: object.id};
    try {
        const foundCalendar = await control.find(filter);
        if (foundCalendar.length != 0) {
            return res.json({msg:true});
        }

        const savedCalendar = await control.save(object);
        res.json(savedCalendar);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetCalendar", async (req, res) => {
    const object = req.body;
    const control = new ControlCalendar();
    const filter = {id: object.id};
    try {
        const foundCalendar = await control.find(filter);
        if (!foundCalendar) {
            return res.json({msg:true});
        }
        res.json(foundCalendar);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyCalendar", async (req, res) => {
    const object = req.body;
    const control = new ControlCalendar();
    const filter = {id: object.id};
    try {
        const foundCalendar = await control.find(filter);
        if (!foundCalendar) {
            return res.json({msg:true});
        }
        
        const modifiedCalendar = await control.modify(
            filter,
            object
        );
        res.json(modifiedCalendar);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteCalendar", async (req, res) => {
    const object = req.body;
    const control = new ControlCalendar();
    const filter = {id: object.id};
    try {
        const foundCalendar = await control.find(filter);
        if (!foundCalendar) {
            return res.json({msg:true});
        }

        const deletedCalendar = await control.delete(filter);
        res.json(deletedCalendar);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetCalendars", (req, res) => {
    const control = new ControlCalendar();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Schedule----------------------//
router.post("/NewSchedule", async (req, res) => {
    const object = req.body;
    const control = new ControlSchedule();
    const filter = {id: object.id};
    try {
        const foundSchedule = await control.find(filter);
        if (foundSchedule.length != 0) {
            return res.json({msg:true});
        }

        const savedSchedule = await control.save(object);
        res.json(savedSchedule);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetSchedule", async (req, res) => {
    const object = req.body;
    const control = new ControlSchedule();
    const filter = {id: object.id};
    try {
        const foundSchedule = await control.find(filter);
        if (!foundSchedule) {
            return res.json({msg:true});
        }
        res.json(foundSchedule);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifySchedule", async (req, res) => {
    const object = req.body;
    const control = new ControlSchedule();
    const filter = {id: object.id};
    try {
        const foundSchedule = await control.find(filter);
        if (!foundSchedule) {
            return res.json({msg:true});
        }
        
        const modifiedSchedule = await control.modify(
            filter,
            object
        );
        res.json(modifiedSchedule);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteSchedule", async (req, res) => {
    const object = req.body;
    const control = new ControlSchedule();
    const filter = {id: object.id};
    try {
        const foundSchedule = await control.find(filter);
        if (!foundSchedule) {
            return res.json({msg:true});
        }

        const deletedSchedule = await control.delete(filter);
        res.json(deletedSchedule);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetSchedules", (req, res) => {
    const control = new ControlSchedule();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

//---------------Day---------------------------//
router.post("/NewDay", async (req, res) => {
    const object = req.body;
    const control = new ControlDay();
    const filter = {id: object.id};
    try {
        const foundDay = await control.find(filter);
        if (foundDay.length != 0) {
            return res.json({msg:true});
        }

        const savedDay = await control.save(object);
        res.json(savedDay);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/GetDay", async (req, res) => {
    const object = req.body;
    const control = new ControlDay();
    const filter = {id: object.id};
    try {
        const foundDay = await control.find(filter);
        if (!foundDay) {
            return res.json({msg:true});
        }
        res.json(foundDay);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/ModifyDay", async (req, res) => {
    const object = req.body;
    const control = new ControlDay();
    const filter = {id: object.id};
    try {
        const foundDay = await control.find(filter);
        if (!foundDay) {
            return res.json({msg:true});
        }
        
        const modifiedDay = await control.modify(
            filter,
            object
        );
        res.json(modifiedDay);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/DeleteDay", async (req, res) => {
    const object = req.body;
    const control = new ControlDay();
    const filter = {id: object.id};
    try {
        const foundDay = await control.find(filter);
        if (!foundDay) {
            return res.json({msg:true});
        }

        const deletedDay = await control.delete(filter);
        res.json(deletedDay);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/GetDays", (req, res) => {
    const control = new ControlDay();
    control.getAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;