const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Crear servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//lectura y parseo del body
app.use(express.json())

//Base de datos 

class Database {

    constructor() {
      this.mongoose = require('mongoose');
    }
  
    async connect(connectionString) {
      try {
        await this.mongoose.connect(connectionString);
        console.log('Ya esta conectado a la base de datos');
      } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
      }
    }
  }
// dbConecction()
const database = new Database();
database.connect(process.env.DB_CNN);

//ejs

app.set('view engine', 'ejs');



//Rutas

app.use('/api/login', require('./routes/auth'))
app.use('/api/modalidad', require('./routes/Modalidad'))
app.use('/api/categoria', require('./routes/Categoria'))
app.use('/api/patrocinador', require('./routes/Patrocinador'))
app.use('/api/equipo', require('./routes/Equipo'))
app.use('/api/usuarios', require('./routes/usuario'))

app.listen( process.env.PORT, ()=> {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
} );