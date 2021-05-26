const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
//const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

const rutas = require("./Router");

//Conectar a la base MongoDB
const MongoDBURI = "mongodb+srv://EduRoot:root1234@gimnasiopopeye.pjwhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB Conectado");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.use("/api", rutas);

app.listen(PORT, console.log(`Servidor iniciado en el puerto ${PORT}`));