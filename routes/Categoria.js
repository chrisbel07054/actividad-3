const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const { getCategoria, postCategoria, putCategoria, deleteCategoria, postCategoriaModalidad, deleteCategoriaModalidad} = require('../controllers/Categoria')
const { ValidarJWT } = require('../middlewares/validar-jsw')

const router = Router()

router.get('/',ValidarJWT, getCategoria)

router.post('/',
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('premio','El premio es obligatorio').not().isEmpty(),

validarCampos , postCategoria)

router.post('/:idModalidad/:idCategoria', ValidarJWT, postCategoriaModalidad)

router.post('/delete/:idModalidad/:idCategoria', ValidarJWT, deleteCategoriaModalidad)


router.put('/:id', 
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('premio','El premio es obligatorio').not().isEmpty(),
validarCampos , putCategoria)

router.delete('/:id',ValidarJWT, deleteCategoria)

module.exports = router