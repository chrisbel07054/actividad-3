const {response} = require('express')
const Categoria = require('../models/Categoria')
const Modalidad = require('../models/Modalidad')
const jwt = require('jsonwebtoken');

const getCategoria = async (req, resp = response ) => {
    try{
        
        const [categoria] = await Promise.all([
            Categoria.find()
        ])

        resp.json({
            ok: true,
            categoria
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postCategoria = async (req, resp = response ) => {
 try {
            const token = req.header('x-token');
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            if(decoded.role != 'Admin'){
                resp.status(401).json({
                    ok:false,
                    msg: 'No puedes realizar esta acción, no eres administrador'
                })
            }
            const categoria = new Categoria(req.body)
            await categoria.save()
              resp.json({
                ok: true,
                categoria
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const putCategoria  = async (req, resp = response ) => {
        const uid = req.params.id
        try {
            const token = req.header('x-token');
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            if(decoded.role != 'Admin'){
                resp.status(401).json({
                    ok:false,
                    msg: 'No puedes realizar esta acción, no eres administrador'
                })
            }
            const CategoriaDb = await Categoria.findById(uid)

            if(!CategoriaDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta Categoria no existe'
                })
                }

            const categoria = await Categoria.findByIdAndUpdate(uid, req.body, {new: true})

            resp.json({
                ok:true,
                categoria
                })  
           
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
   }


const deleteCategoria = async( req, resp = response ) => {
    const uid = req.params.id
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'Admin'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres administrador'
            })
        }
    const CategoriaDB = await Categoria.findById(uid)

     //Verificacion de que ya exista el categoria
    if(!CategoriaDB){
        return resp.status(400).json({
            ok:false,
            msg:'Esta categoria no existe'
        })
        }

        //Eliminación
        const categoria = await Categoria.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'Categoria eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const postCategoriaModalidad = async(req, resp = response) => {
        const idModalidad = req.params.idModalidad
        const idCategoria = req.params.idCategoria
        try {

            const categoriaDb = await Categoria.findById(idCategoria)
            if(!categoriaDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta Categoria no existe'
                })
            }

            const modalidadDb = await Modalidad.findById(idModalidad) 
            if(!modalidadDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta Modalidad no existe'
                })
            }

            modalidadDb.categorias = [...modalidadDb.categorias, idCategoria]
            const modalidadActualizada = await modalidadDb.save()

            
            resp.json({
                ok:true,
                msg: "Categoria agregada correctamente",
                modalidad: modalidadActualizada
                })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const deleteCategoriaModalidad = async(req, resp = response) => {
    const idModalidad = req.params.idModalidad
    const idCategoria = req.params.idCategoria
    try {

        const categoriaDb = await Categoria.findById(idCategoria)
        if(!categoriaDb){
            return resp.status(400).json({
                ok:false,
                msg:'Esta Categoria no existe'
            })
        }

        const modalidadDb = await Modalidad.findById(idModalidad) 
        if(!modalidadDb){
            return resp.status(400).json({
                ok:false,
                msg:'Esta Modalidad no existe'
            })
        }

        modalidadDb.categorias = modalidadDb.categorias.filter( categoria => categoria._id !== categoriaDb._id)
        console.log(modalidadDb)
        const modalidadActualizada = await modalidadDb.save()

        
        resp.json({
            ok:true,
            msg: "Categoria eliminada correctamente",
            modalidad: modalidadActualizada
            })  
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}




 { getCategoria, postCategoria, putCategoria, deleteCategoria, postCategoriaModalidad, deleteCategoriaModalidad}
