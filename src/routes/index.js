const express = require('express');
const router = express.Router();
const port = 3000;
const persona = require('./persona');
var app = express();

app .use(express.json()); 
app .use(express.static('public'));

app.use('/persona', persona);

router.get('/', (req,res) => {
    res.render('Hola Mundo ruta de prueba');
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = router;