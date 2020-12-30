"use strict";
const express = require('express');
const router = express.Router();
const conexion = require('../db/conexion');
const util = require('util');

const qy = util.promisify(conexion.query).bind(conexion);

router.post('/', async (req,res) => {
    const {nombre, apellido, alias, email}=req.body;

    if(!nombre || !apellido || !alias || !email ) { 
        throw new Error('Faltan ingresar datos');
    }

   try {      
       const query = 'INSERT INTO persona (nombre, apellido, alias, email) VALUES (?,?,?,?)';
       const respuesta = await qy(query, [nombre, apellido, alias, email]);
       res.status(200).send({"respuesta" : respuesta.insertId});
    } catch (error) {
       res.status(413).send({"Error" : error.message});
   }
})


router.put('/:id', async(req, res)=>{
    const {nombre, apellido, alias, email}=req.body;
    const {id}=req.params;

    if(!email){
        throw new Error('El campo mail no se puede modificar');
    }

    try{
 
     let query = 'SELECT * FROM persona WHERE nombre = ? AND id <> ?';
     let respuesta = await qy(query, [nombre, id]);

 /*    if (respuesta.length > 0){
        throw new Error("El nombre de la persona que queres poner ahora ya existe");
     }*/
 
     query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ? where id = ?';
     respuesta = await qy(query, [nombre,apellido, alias, id]);
     res.status(200).send({"respuesta": respuesta.affectedRows});
 
    }
 
    catch(e){    
     console.error(e.message);
     res.status(413).send({"Error":e.message});
    }
 });

module.exports = router;