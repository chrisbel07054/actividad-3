const {response} = require('express')
const Modalidad = require('../models/Modalidad')
const Categoria = require('../models/Categoria')


const getModalidad = async (req, resp = response ) => {

    try{
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


        resp.json({
            ok: true,
            modalidad
        })


    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postModalidad = async (req, resp = response ) => {
 try {
            const modalidad = new Modalidad(req.body)
            await modalidad.save()
              resp.json({
                ok: true,
                modalidad
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const putModalidad  = async (req, resp = response ) => {
        const uid = req.params.id
        try {
            const modalidadDb = await Modalidad.findById(uid)

            if(!modalidadDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta modalidad no existe'
                })
                }

            const modalidad = await Modalidad.findByIdAndUpdate(uid, req.body, {new: true})

            resp.json({
                ok:true,
                modalidad
                })  
           
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
   }


const deleteModalidad = async( req, resp = response ) => {
    const uid = req.params.id
    try {
    const ModalidadDB = await Modalidad.findById(uid)

     //Verificacion de que ya exista el modalidad
    if(!ModalidadDB){
        return resp.status(400).json({
            ok:false,
            msg:'Esta modalidad no existe'
        })
        }

        //Eliminación
        const modalidad = await Modalidad.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'Modalidad eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getModalidad, postModalidad, putModalidad, deleteModalidad}
