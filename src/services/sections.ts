import {PrismaClient, Prisma} from '@prisma/client';
import * as Types from "../types/Sections";
 
const prisma = new PrismaClient();

export type sectionCreateData = Prisma.Args<typeof prisma.section, 'create'>['data'];

export const create = async(data: sectionCreateData) =>{
    try{
        return prisma.section.create({data});
    }catch(err){
        console.log(err);
        return false;
    }
}

type sectionUpdateData = Prisma.Args<typeof prisma.section, 'update'>['data'];
type updateFilter ={
    id: number;
    siteId: number;
}
export const update = async(filter: updateFilter,data: sectionUpdateData) =>{
    try{    
        return prisma.section.update({where: filter, data});
    }catch(err){
        console.log(err);
        return false;
    }
}
type Filters = {
    id?: number;
    siteId?: number;
}
export const getAll = async(filters: Filters) =>{
    try{
        return await prisma.section.findMany({
            where: filters,
            orderBy: {
                order: 'asc',
            },
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

export const remove = async(filters: Filters) =>{
    try{
        return await prisma.section.delete({
            where: {id: filters.id, siteId: filters.siteId},
        });
    }   
    catch(err){
        console.log(err);
        return false;
    }
}