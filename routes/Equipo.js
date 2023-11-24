const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getEquipo, postEquipo, putEquipo, deleteEquipo, getCategoriaEquipo, deleteCategoriaEquipo} = require('../controllers/Equipo')
const { ValidarJWT } = require('../middlewares/validar-jsw')

const router = Router()

router.get('/',ValidarJWT, getEquipo)

router.get('/:idCategoria',ValidarJWT, getCategoriaEquipo)

router.post('/',
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , postEquipo)

router.put('/:id', 
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , putEquipo)

router.put('/:idCategoria/:id', 
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , deleteCategoriaEquipo)

router.delete('/:id',ValidarJWT, deleteEquipo)

module.exports = router