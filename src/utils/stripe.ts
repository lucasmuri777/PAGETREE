import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE as string, {
    apiVersion: '2024-10-28.acacia',
});

export const createStripeCustomer = async (email: string, name: string) => {
  try {
    // Verifica se já existe um cliente com o mesmo e-mail
    const existingCustomer = await stripe.customers.list({
      email: email,
    });

    // Se encontrar um cliente com esse email, retorna o stripeID do cliente existente
    if (existingCustomer.data.length > 0) {
      return existingCustomer.data[0].id;
    }

    // Caso contrário, cria um novo cliente
    const stripeCustomer = await stripe.customers.create({
      email: email,
      name: name,
    });

    // Retorna o stripeID (id do cliente)
    return stripeCustomer.id;
  } catch (error) {
    console.error('Erro ao criar o cliente no Stripe:', error);
    throw new Error('Erro ao criar o cliente no Stripe');
  }
};


export default stripe;