const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getPatrocinador, postPatrocinador, putPatrocinador, deletePatrocinador} = require('../controllers/Patrocinador')
const Patrocinador = require('../models/Patrocinador')
const { ValidarJWT } = require('../middlewares/validar-jsw')

const router = Router()

router.get('/', async (req, resp) => {
    
    const [patrocinador] = await Promise.all([
        Patrocinador.find()
    ])

    resp.render('pages/patrocinadores', {patrocinador})
})

router.get('/patrocinador',ValidarJWT, getPatrocinador)

router.post('/',
ValidarJWT,
check('nombreComercial','El nombreComercial es obligatorio').not().isEmpty(),
check('personaContacto','El personaContacto es obligatorio').not().isEmpty(),
check('telefono','El telefono es obligatorio').not().isEmpty(),
check('patrocinio','El Patrocinio es obligatorio').not().isEmpty(),
validarCampos , postPatrocinador)

router.put('/:id', 
ValidarJWT,
check('nombreComercial','El nombreComercial es obligatorio').not().isEmpty(),
check('personaContacto','El personaContacto es obligatorio').not().isEmpty(),
check('telefono','El telefono es obligatorio').not().isEmpty(),
check('patrocinio','El Patrocinio es obligatorio').not().isEmpty(),
validarCampos, putPatrocinador)

router.delete('/:id',ValidarJWT, deletePatrocinador)

module.exports = router