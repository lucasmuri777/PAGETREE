import {PrismaClient, Prisma} from '@prisma/client';
 
const prisma = new PrismaClient();

type SiteCreateData = Prisma.Args<typeof prisma.site, 'create'>['data'];
export const create = async(data: SiteCreateData) =>{
    try{    
        return await prisma.site.create({data});
    }catch(err){
        console.log(err + 'errorrrr');
        return false;
    }
}

type SiteUpdateData = Prisma.Args<typeof prisma.site, 'update'>['data'];
type updateFilter = {
    id: number;
    userId: number;
}
export const update = async(filter: updateFilter, data: SiteUpdateData) =>{
    try{    
        return await prisma.site.updateMany({where: filter, data});
    }catch(err){
        console.log(err);
        return false;
    }
}

type Filters = {
    id?: number;
    userId?: number;
    title?: string;
}

export const getAll = async(filters: Filters) =>{
    try{    
        return await prisma.site.findMany({where: filters});
    }catch(err){
        console.log(err);
        return false;
    }
}

export const remove = async(filters: Filters) =>{
    try{
        return await prisma.site.delete({
            where: {id: filters.id, userId: filters.userId},
        });
    }   
    catch(err){
        console.log(err);
        return false;
    }
}