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
// Initialize your Stripe client

export const createChekout:RequestHandler = async(req, res) =>{
    const authorization = req.headers.authorization;
    const user: UserStripe = await decodedJWT(authorization as string) as UserStripe;
    const siteSchema = z.object({
        priceId: z.string(),
        success_url: z.string(),
        cancel_url: z.string(),
    })
    const body = siteSchema.safeParse(req.body);
    if(!body.success){
        res.json({error: 'Dados inválidos'});
        return;
    }
    if(user){
        
        try{
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                customer: user.stripeId, 
                line_items: [{ price: body.data.priceId, quantity: 1 }],
                success_url: body.data.success_url,
                cancel_url: body.data.cancel_url,
                metadata: {
                    userId: user.id,
                },
               
            });
            res.status(200).json({ sessionId: session.url });
            return;
        }catch(err){
            console.error(err);
            res.status(500).json({ error: err });
            return;
        }
    }
    res.json({error: 'Algo deu errado'});
    return;
}
export const handleWebhook: RequestHandler = async(req,res) =>{
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.ENDPOINT_STRIPE_SECRET as string;

    try {
        if (sig) {
            const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            switch (event.type) {
                case 'invoice.payment_failed':
                    const failedInvoice = event.data.object;
                    
                    if (failedInvoice.customer) {
                        await User.updatePremium({ stripeId: failedInvoice.customer as string }, { plan: SubscriptionType.FREE });
                        console.log(`Pagamento falhou para o usuário ${ failedInvoice.customer}, acesso premium revogado`);
                    }
                    
                    break;

                case 'invoice.payment_succeeded':
                    const succeededInvoice = event.data.object;
                    const succeededPriceId = succeededInvoice.lines?.data[0]?.price?.id ?? null; // Evita erro de null

                    let planType: SubscriptionType = SubscriptionType.FREE;

                    if (succeededPriceId === process.env.STRIPE_PRICE_ID_PREMIUM_MENSAL || succeededPriceId === process.env.STRIPE_PRICE_ID_PREMIUM_ANUAL ) {
                        planType = SubscriptionType.PREMIUM;
                    } else if (succeededPriceId === process.env.STRIPE_PRICE_ID_BASIC_MENSAL || succeededPriceId === process.env.STRIPE_PRICE_ID_BASIC_ANUAL) {
                        planType = SubscriptionType.BASIC;
    }
                    if (succeededInvoice.customer) {
                        await User.updatePremium({ stripeId: succeededInvoice.customer as string }, { plan: planType });
                        console.log(`Pagamento bem-sucedido para o usuário de id ${ succeededInvoice.customer}, acesso premium concedido`);
                    }
                    break;

                case 'customer.subscription.deleted':
                    const deletedSubscription = event.data.object;

                    if (deletedSubscription.customer) {
                        await User.updatePremium({ stripeId: deletedSubscription.customer as string }, { plan: SubscriptionType.FREE });

                        console.log(`Assinatura cancelada para o usuário ${deletedSubscription.customer as string}, acesso premium revogado`);
                    }
                    
                    break;

                case 'customer.subscription.updated':
                    const updatedSubscription = event.data.object;
                    const updatedUserId = updatedSubscription.customer;
                    
                    if (updatedSubscription.status === 'canceled' || updatedSubscription.status === 'unpaid') {
                        await User.updatePremium({ stripeId: updatedUserId as string }, { plan: SubscriptionType.FREE });
                        console.log(`Assinatura atualizada e cancelada para o usuário ${updatedUserId}, acesso premium revogado`);
                    }
                    break;

                default:
                    console.log(`Evento não tratado: ${event.type}`);
            }
        }

        res.json({ received: true });
    } catch (err: any) {
        console.error("Erro no webhook:", err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
   
}
export const updateUser: RequestHandler = async(req,res) =>{
    const {id, premium} = req.body;
    if(id && premium){
        let filter = {
            stripeId: String(id)
        }
        let data = {
            premium: JSON.parse(premium)
        }
        const teste = User.updatePremium( filter, data)
        if(teste){
            res.status(200).json({updatedUser: teste});
            return;
        }
    }
    res.json({error: 'Algo deu errado'});
    return;
}