const express = require('express');
const fs = require('fs');
var cors = require('cors')

let dataArr = [];
const app = express();
app.use(cors());

fs.readFile('405.csv', 'utf8', function (err, data) {
    if(!err){
        dataArr = data.split('\n').slice(1,data.length);
    }
    else    
        console.log(err);
});

app.get('/mapData', (req, res) => {
    console.log(dataArr);
    res.send(JSON.stringify(dataArr));
});

app.listen(5001, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ 5001)
    else 
        console.log("Error occurred, server can't start", error);
    }
);