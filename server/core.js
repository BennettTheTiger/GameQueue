let express = require('express');
const { Client } = require('pg');
let ip = require("ip");
let app = express();

//setup database
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});



app.use(express.json());//lets you use req.body and get json
const port = process.env.PORT || 3000; 

//server line is an array of team name objects
var line = [];

app.get('/', (req, res) => res.sendFile(__dirname + '/dist/name.html'));
app.get('/scoreBoard', (req, res) => res.sendFile(__dirname  + '/dist/score.html'));
//get the next team in line
app.get('/nextTeam',(req,res) =>{
    if(line.length > 0) res.status(200).send({teamName:line.shift()});
    else res.status(204).send({error:'No teams in line'}); //no content error code 
});

app.get('*',(req,res) => res.status(400).send('Bad request'));

//Handles adding Teams a que
app.post('/addTeam',(req,res) =>{
    let name = req.body.teamName;
    console.log('\x1b[36m%s\x1b[0m',name);//print the name in cyan
    if(name != undefined || name != null){
        line.push(name);
        res.status(201).send({msg:name,lineLength: line.length});
    }
    else res.status(400).send({msg:'Bad request, send as a json object using {teamName: yourTeam}'}); 
});

app.post('/newScore',(req,res) =>{

});

console.dir (`server live at ${ip.address()}:${port}`);
app.listen(port, () => console.log(`App listening on localhost:${port}!`));