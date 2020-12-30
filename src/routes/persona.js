const express = require('express');

const router = express.Router();

router.get('/persona', async (req,res) => {
    try {
        const query = 'SELECT * FROM persona';
        const respuesta = await conexion.query(query);
        res.status(200).send({"respuesta" : respuesta});
    } catch (error) {
        res.status(413).send({"error": error.message});
    }
});

module.exports = router;