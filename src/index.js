
import express from "express"; 
import cors from "cors"; 
import  {sumar, restar, dividir, multiplicar} from './modules/matematica.js'
import { OMDBGetByImdbID, OMDBSearchByPage, OMDBSearchComplete } from "./modules/OMDBWrapper.js";
import Alumno from "./models/alumno.js";

const app = express();
const port = 3000;


app.use(cors()); 
app.use(express.json()); 



const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));




app.get('/', (req, res) => { 
    res.status(200).send('Ya estoy respondiendo (200)!');
})

app.get('/saludar/:nombre', (req, res) => { 
    res.status(200).send('Hola ' + req.params.nombre + ' (200)');
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { 
    
    let fecha = new Date(req.params.ano, req.params.mes - 1, req.params.dia);
    if(!isNaN(fecha)){
        res.status(200).send(fecha);
    }
    else{
        res.status(400).send();
    }
})


app.get('/matematica/sumar', (req, res) => {
    let suma = sumar(req.query.n1, req.query.n2);
    res.status(200).send(suma.toString());
})

app.get('/matematica/restar', (req, res) => {
    let resta = restar(req.query.n1, req.query.n2);
    res.status(200).send(resta.toString());
})

app.get('/matematica/multiplicar', (req, res) => {
    let producto = multiplicar(req.query.n1, req.query.n2);
    res.status(200).send(producto.toString());
})

app.get('/matematica/dividir', (req, res) => {
    let cociente = dividir(req.query.n1, req.query.n2);
    if(req.query.n2 == 0){
        res.status(400).send("El divisor no puede ser 0");
    }
    else{
        res.status(200).send(cociente.toString());
    }
})


app.get('/ombd/searchbypage', async (req, res) => {
    let returnObject = await OMDBSearchByPage(req.query.search, req.query.p);
    res.status(200).send(returnObject);
})

app.get('/ombd/searchcomplete', async (req, res) => {
    let returnObject = await OMDBSearchComplete(req.query.search);
    res.status(200).send(returnObject);
})

app.get('/ombd/getombdid', async (req, res) => {
    let returnObject = await OMDBGetByImdbID(req.query.imbdID);
    res.status(200).send(returnObject);
})

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
})

app.get('/alumnos/:dni', (req, res) => {
    res.status(200).send(alumnosArray.find((alumno) => alumno.dni == req.params.dni));
})

app.post('/alumnos', (req, res) => {
    alumnosArray.push(new Alumno(req.query.nombre, req.query.dni, parseInt(req.query.edad)));
    res.status(201).send("Created");
})

app.delete('/alumnos', (req, res) => {
    const index = alumnosArray.findIndex(alumno => alumno.dni == req.query.dni);
    if(index !== -1){
        alumnosArray.splice(index, 1);
        res.status(200).send("Eliminado Correctamente");
    }
    else{
        res.status(400).send("No existe un alumno con ese DNI");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
