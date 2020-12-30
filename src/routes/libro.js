const express = require('express');

const router = express.Router();

router.get('/libro/:id', async (req,res) => {
    const {id} = req.params;
  try {
      const query = 'SELECT * FROM libro WHERE id = ?';
      const respuesta = await conexion.query(query, id);

      res.status(200).send({"respuesta" : respuesta});
  } catch (error) {
      res.status(413).send({"Error" : error.message});
  }
})
module.exports = router;