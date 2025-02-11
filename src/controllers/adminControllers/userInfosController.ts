import Stripe from "stripe";
import dotenv from 'dotenv';
import { RequestHandler } from "express";
import { decodedJWT } from "../../services/auth";
import { UserStripe } from "../../types/User";
import * as User from '../../services/user';
import { SubscriptionType } from '@prisma/client';
import { z } from "zod";
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE as string, {
    apiVersion: '2024-10-28.acacia',
});

export const getInfoUser: RequestHandler = async(req, res) =>{
    const id_user = req.params.id_user;
    const token: UserStripe = await decodedJWT(req.headers.authorization as string) as UserStripe;
    if(parseInt(id_user) == token.id && token.stripeId){
          // Buscar os últimos pagamentos do cliente
        const payments = await stripe.paymentIntents.list({
            customer: token.stripeId,
            limit: 5,
        });
    
        res.json(payments.data);
        return;
    }
    res.json({error: 'Algo deu errado'});
    return;
}