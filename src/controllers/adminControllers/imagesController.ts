import { RequestHandler } from "express";
import * as images from '../../services/image';


export const createImage: RequestHandler = async(req, res) =>{
    const id_user = req.params.id_user;
    const file = req.file;

    if(id_user && file){
       
       const uploadImage = await images.uploadImageToFirebase(file)
       if(uploadImage){
            const image = await images.createImageRefInBd({userId: parseInt(id_user), url:uploadImage})
            if(image){
                res.status(201).json({image});
                return;
            }
        }
    }
    res.json({error: 'Algo deu errado'})
    return;
}

export const getImagesByIdUser: RequestHandler = async(req, res) =>{
    const id_user = req.params.id_user;
    if(id_user){
        const image = await images.getAll({userId: parseInt(id_user)});
        if(image){
            res.json({image});
            return;
        }
    }
    res.json({error: 'Algo deu errado'})
    return;
}

export const deleteImage: RequestHandler = async(req, res) =>{
    const {id_user, id} = req.params;
    if(id_user && id){
        const deletedImage = await images.remove({userId: parseInt(id_user), id: parseInt(id)});
        if(deletedImage){
           const url = deletedImage.url;
           const deletedImageFirebase = await images.deleteImageFromFirebase(url);
           if(deletedImageFirebase){
                res.status(200).json({deletedImage});
                return;
            }
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
}