import {PrismaClient, Prisma} from '@prisma/client';
import {createStripeCustomer} from '../utils/stripe'; 
const prisma = new PrismaClient();

type UserCreateData = {
    name: string;
    email: string;
}
export const add = async(data: UserCreateData) =>{

    try {
        const stripeId = await createStripeCustomer(data.email, data.name);
        const userData = {
            name: data.name,
            email: data.email,
            stripeId: `${stripeId}`,
        }
        return await prisma.user.create({data:userData});
    } catch (error) {
        console.log(error);
        return false;
    }
}

type GetOneFilters = {
    id?: number,
    email?: string,
}
export const getOne = async(filters: GetOneFilters) =>{
    try{
        return prisma.user.findFirst({where: filters});
    }catch(error){
        console.log(error);
        return false;
    }
}
type updateFilter ={
    stripeId: string;
}
type UserUpdateData = Prisma.Args<typeof prisma.user, 'update'>['data'];

export const updatePremium = async(filter: updateFilter,data: UserUpdateData) =>{
    try{    
        return prisma.user.update({where: filter, data});
    }catch(err){
        console.log(err);
        return false;
    }
}