const express = require('express');
const multer = require('multer')
const fs = require('fs')

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

let storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        let dir = './uploads';
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

let upload = multer({storage: storage}).array('files', 12);

app.post('/upload', (req, res, next)=>{
    upload(req, res, (err)=> {
        if(err) {
            return res.end("Someting went wrong")
        }
        res.end("Upload completed.")
    })
})

app.get('/download', (req, res)=> {
    let filePath = __dirname + '/uploads/';
    let fileName = 'Akash.jpeg';
    // res.send(fileName)
    res.sendFile(filePath + fileName)
})
app.listen(3040, ()=>{
    console.log('Server is running on port 3040...')
})

