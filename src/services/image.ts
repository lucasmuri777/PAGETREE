import { ref, uploadBytes,deleteObject } from "firebase/storage";
import { storage } from "../instances/firebase";
import {generateUniqueFileName} from '../utils/generateUniqueFileName ';
import {PrismaClient, Prisma} from '@prisma/client';
const prisma = new PrismaClient();


export const uploadImageToFirebase = async (file: Express.Multer.File): Promise<string | null> => {
  try {
    const uniqueFileName = generateUniqueFileName(file.originalname);
    const storageRef = ref(storage, `images/${uniqueFileName}`); 

    const metadata = {
        contentType: file.mimetype, // Exemplo: image/jpeg
    };
  
    await uploadBytes(storageRef, file.buffer, metadata);
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${encodeURIComponent(storageRef.fullPath)}?alt=media`;
    return imageUrl; 

  } catch (error) {
    console.error("Erro ao fazer upload para o Firebase:", error);
    return null;
  }
};

export const deleteImageFromFirebase = async (filePath: string): Promise<boolean> => {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);

      return true;
    } catch (error) {
      console.error("Erro ao excluir imagem do Firebase:", error);
      return false;
    }
  };


export type imageCreateData = Prisma.Args<typeof prisma.images, 'create'>['data'];


export const createImageRefInBd = async(data: imageCreateData) =>{
    try{
        return prisma.images.create({data});
    }catch(err){
        console.log(err);
        return false;
    }
}

type Filter = {
    id?: number;
    userId?: number;
}

export const getAll = async(filters: Filter) =>{
    try{    
        return prisma.images.findMany({
            where: filters,
            orderBy: {
                createdAt: 'asc',
            },
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

export const remove = async(filters: Filter) =>{
    try{
        return prisma.images.delete({where: {id: filters.id, userId: filters.userId}});
    }catch(err){
        console.log(err);
        return false;
    }
}