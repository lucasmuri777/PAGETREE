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
        const subscriptions = await stripe.subscriptions.list({
            customer:  token.stripeId,
            status: "active", // Apenas assinaturas ativas
            limit: 1,
        });
         
        if (subscriptions.data.length === 0) {
            res.status(404).json({ error: "Nenhuma assinatura ativa encontrada" });
            return
        }
      
        const subscription = subscriptions.data[0];
        const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
        const product = await stripe.products.retrieve(price.product as string);
    
        res.json({
            plan: product.name, // Nome do plano (ex: "Mensal" ou "Anual")
            renewalDate: new Date(subscription.current_period_end * 1000).toISOString(), // Data de renovação
            payments: payments.data,
        });
        return;
    }
    res.json({error: 'Algo deu errado'});
    return;
}