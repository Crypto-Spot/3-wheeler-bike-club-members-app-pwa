"use server"

import axios from "axios";
import { User } from "@privy-io/server-auth";



export async function initiateHostedPayment( amount: number, countryCode: string, email: string, reference: string, firstName: string, lastName: string ) {
   
    try {
        const cashramp = axios.create({
            baseURL: 'https://api.useaccrue.com/cashramp/api/graphql',
            headers: { 'Authorization': `Bearer ${process.env.CASHRAMP_SECRET_KEY}` } 
        });
    
        const INITIATE_HOSTED_PAYMENT = `
            mutation {
                initiateHostedPayment(
                    paymentType: deposit,
                    amount: ${amount},
                    currency: usd,
                    countryCode: "${countryCode}",
                    reference: "${reference}",
                    firstName: "${firstName}",
                    lastName: "${lastName}",
                    email: "${email}"
                ) {
                    id
                    hostedLink
                    status
                }
            }
        `;
        const initiateHostedPayment = await cashramp.post('', { query: INITIATE_HOSTED_PAYMENT })
        return initiateHostedPayment.data.data.initiateHostedPayment
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to initiate hosted payment" }), { status: 500 })
    }

}
