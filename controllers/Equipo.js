const {response} = require('express')
const Equipo = require('../models/Equipo')
const Categoria = require('../models/Categoria')

const getEquipo = async (req, resp = response ) => {

    try{
        const [equipo] = await Promise.all([
            Equipo.find()
        ])

        await Promise.all(equipo.map(async (equipo) => {

            var categoriasMapeadas = []
          
            await Promise.all(equipo.categoria.map(async (categoria) => {
          
              categoriasMapeadas.push(await Categoria.findById(categoria))
          
            }))
          
            equipo.categoria = categoriasMapeadas
          
          }))

        resp.json({
            ok: true,
            equipo
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postEquipo = async (req, resp = response ) => {
 try {
            const equipo = new Equipo(req.body)
            await equipo.save()
              resp.json({
                ok: true,
                equipo
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const putEquipo  = async (req, resp = response ) => {
        const uid = req.params.id
        try {
            const EquipoDb = await Equipo.findById(uid)

            if(!EquipoDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta Equipo no existe'
                })
                }

            const equipo = await Equipo.findByIdAndUpdate(uid, req.body, {new: true})

            resp.json({
                ok:true,
                equipo
                })  
           
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
   }


const deleteEquipo = async( req, resp = response ) => {
    const uid = req.params.id
    try {
    const EquipoDB = await Equipo.findById(uid)

     //Verificacion de que ya exista el equipo
    if(!EquipoDB){
        return resp.status(400).json({
            ok:false,
            msg:'Este equipo no existe'
        })
        }

        //Eliminación
        const equipo = await Equipo.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'Equipo eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const deleteCategoriaEquipo = async( req, resp = response ) => {
    const uid = req.params.id
    const idcategoria = req.params.idCategoria
  
    try {
      const equipoDB = await Equipo.findById(uid)
      const CategoriaDb = await Categoria.findById(idcategoria)
  
      //Verificacion de que ya exista el equipo
      if (!equipoDB) {
        return resp.status(400).json({
          ok: false,
          msg: 'Este equipo no existe'
        })
      }
  
      if (!CategoriaDb) {
        return resp.status(400).json({
          ok: false,
          msg: 'Esta categoria no existe'
        })
      }
  
      equipoDB.categoria = equipoDB.categoria.filter(id => id !== idcategoria)
      const equipo = await equipoDB.save()
  
      resp.json({
        ok: true,
        msg: 'Categoria eliminada del equipo',
        equipo
      })
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... reivsar logs'
      })
    }
  }

const getCategoriaEquipo = async (req, resp = response ) => {
    const idcategoria = req.params.idCategoria

    try{
        let [equipo] = await Promise.all([
            Equipo.find()
        ])

        equipo = equipo.filter(equipo => equipo.categoria.includes(idcategoria))

        resp.json({
            ok: true,
            equipo
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


module.exports = { getEquipo, postEquipo, putEquipo, deleteEquipo, getCategoriaEquipo, deleteCategoriaEquipo}
