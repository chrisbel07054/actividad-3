const {check} = require('express-validator')
const {Router} = require('express')
const {validarCampos}= require('../middlewares/validar-campos')
const Modalidad = require('../models/Modalidad')
const Categoria = require('../models/Categoria')
const { getModalidad, postModalidad, putModalidad, deleteModalidad} = require('../controllers/Modalidad')
const { ValidarJWT } = require('../middlewares/validar-jsw')

const router = Router()

router.get('/', async (req, resp) => {
    
    const [modalidad] = await Promise.all([
        Modalidad.find()
    ])

    await Promise.all(modalidad.map(async (modalidad) => {

        var categoriasMapeadas = []
      
        await Promise.all(modalidad.categorias.map(async (categoria) => {
      
          categoriasMapeadas.push(await Categoria.findById(categoria))
      
        }))
      
        modalidad.categorias = categoriasMapeadas
      
      }))

    resp.render('pages/index', {modalidad})
})


router.get('/modalidad',ValidarJWT, getModalidad)

router.post('/',
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , postModalidad)

router.put('/:id', 
ValidarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos , putModalidad)

router.delete('/:id',ValidarJWT, deleteModalidad)

module.exports = router