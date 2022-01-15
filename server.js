//"start": "nodemon server.js"
const dbconnector = require('./dbConnector.js');


//instancias node.js----------------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//const port = process.env.PORT || 8484;
const port = 8484

//preparar la app---------------------------

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

//links-------------------------------------------
app.use('/',router);

router.route('/').get((req,res)=>{
    res.send('Esta Funcionando la api');
});

router.route('/user').get(async(req,res)=>{
    result = await dbconnector.query('SELECT * FROM datos_personales');
    res.json(result);
});

router.route('/area_desempenio').get(async(req,res)=>{
    result = await dbconnector.query('SELECT * FROM cat_area_desempenio');
    res.json(result);
});

router.route('/instituto_titulo').get(async(req,res)=>{
    result = await dbconnector.query('SELECT * FROM cat_instituto_titulo');
    res.json(result);
});

router.route('/logros').get(async(req,res)=>{
    result = await dbconnector.query('SELECT * FROM cat_logros_academicos');
    res.json(result);
});

router.route('/personal/update').post(async(req,res)=>{
    let usuario = req.body.actu
    let datos = req.body.area

    if(datos[1]=="1"){
        result = await dbconnector.update(
            'UPDATE datos_personales SET per_nom1=? WHERE cod_personal=? AND cod_estado_registro=1',
             [usuario,datos[0]]);
    }else if(datos[1]=="2"){
        result = await dbconnector.update(
            'UPDATE datos_personales SET per_nom2=? WHERE cod_personal=? AND cod_estado_registro=1',
             [usuario,datos[0]]);
    }else if(datos[1]=="3"){
        result = await dbconnector.update(
            'UPDATE datos_personales SET per_apellido1=? WHERE cod_personal=? AND cod_estado_registro=1',
             [usuario,datos[0]]);
    }else if(datos[1]=="4"){
        result = await dbconnector.update(
            'UPDATE datos_personales SET per_apellido2=? WHERE cod_personal=? AND cod_estado_registro=1',
             [usuario,datos[0]]);
    }

    console.log(usuario)
    console.log(datos)
});

router.route('/logros/update').post(async(req,res)=>{
    let datos = req.body.area1;

    result = await dbconnector.update(
        'UPDATE det_areas_desempenio SET cod_area_desempenio=? WHERE cod_personal=? AND cod_area_desempenio=? AND cod_estado_registro=1',
         [datos[2],datos[0],datos[1]]);

    console.log(datos)
});

router.route('/logrosPersonal/update').post(async(req,res)=>{
    result = await dbconnector.update(
        'UPDATE det_titulacion SET cod_logro_academico=? WHERE cod_personal=? AND cod_estado_registro=1',
         [req.body.codLogro,req.body.codPersonal]);
    
    

    res.json(result);
});

router.route('/personal/add').post(async(req,res)=>{
    /*result = await dbconnector.add(
        'INSERT INTO datos_personales(per_nom1,per_nom2,per_apellido1,per_apellido2,fec_nacimiento,1) VALUES (?,?,?,?,?)',
         [req.body.per_nom1,req.body.per_nom2,req.body.per_apellido1,req.body.per_apellido2,req.body.fec_nacimiento,]);
    res.json(result);*/
    let primerNombre = req.body.primerNombre;
    let segundoNombre = req.body.segundoNombre;
    let primerApellido = req.body.primerApellido;
    let segundoApellido = req.body.segundoApellido;
    let fec_nacimiento = req.body.fecNacimiento;
        
    
    result = await dbconnector.add(
        'INSERT INTO datos_personales(per_nom1,per_nom2,per_apellido1,per_apellido2,fec_nacimiento,cod_estado_registro) VALUES (?,?,?,?,?,1)',
         [primerNombre,segundoNombre,primerApellido,segundoApellido,fec_nacimiento]);
    //res.send("post para registrar usuarios")
    //res.json(result);

    console.log("ingreso con exito");
    
});

router.route('/area/add').post(async(req,res)=>{
    
    
    let codArea = req.body.area;

    
    result = await dbconnector.add(
        'INSERT INTO det_areas_desempenio(cod_personal,cod_area_desempenio,cod_estado_registro) VALUES (?,?,1)',
        codArea);

    console.log("ingreso con exito");
    console.log(codArea)
    
});

router.route('/titulo/add').post(async(req,res)=>{
    
    
    let datos = req.body.area;

    
    result = await dbconnector.add(
        'INSERT INTO det_titulacion(cod_personal,institucion,cod_logro_academico) VALUES (?,?,?,1)',
        datos);

    console.log("ingreso con exito");
    console.log(datos)
    
});
//ProxyPass /logros http://localhost:8484/logros
//ProxyPass /instituto_titulo http://localhost:8484/instituto_titulo
//ProxyPass /area_desempenio http://localhost:8484/area_desempenio
//running server----------------------------------
app.listen(port);