import 'dotenv/config'
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT ||3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms"

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let teaData = [];
let nextID=1;

//add a new tea
app.post('/teas', (req,res)=>{
    const {name, price} = req.body
    const newTea ={id: nextID++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas', (req,res) =>{
    res.status(200).send(teaData)
})

//get a tea with ID
app.get('/teas/:id', (req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id));

    if(!tea){
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
})

//update tea
app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id));

    if(!tea){
        return res.status(404).send('Tea not found');
    }
    const {name,price}=req.body;
    tea.name=name
    tea.price=price
    res.send(200).send(tea)
})

app.delete('/teas/:id', (req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send("tea not found");
    }
    teaData.splice(index,1);
    return res.status(204).send("deleted");
})


app.listen(port, ()=> {
    console.log(`Server is running at port: ${port}...`)
})


//basics/
// app.get("/", (req, res) =>{
//     res.send("Hello")
// })

// app.get("/ice-tea", (req, res) =>{
//     res.send("What ice tea would you prefer?")
// })

// app.get("/twitter", (req, res) =>{
//     res.send("open twitter id")
// })