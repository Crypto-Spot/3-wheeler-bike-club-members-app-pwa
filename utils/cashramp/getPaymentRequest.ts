"use server"

import axios from "axios";


export async function getPaymentRequest( reference: string ) {
   
    try {
        const cashramp = axios.create({
            baseURL: 'https://api.useaccrue.com/cashramp/api/graphql',
            headers: { 'Authorization': `Bearer ${process.env.CASHRAMP_SECRET_KEY}` } 
        });
    
        const PAYMENT_REQUEST = `
            query {
                merchantPaymentRequest(reference: "${reference}") {
                    id
                    paymentType
                    hostedLink
                    amount
                    currency
                    reference
                    metadata
                    status
                }
            }
        `;
        const getPaymentRequest = await cashramp.post('', { query: PAYMENT_REQUEST })
        return getPaymentRequest.data.data.merchantPaymentRequest
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to get payment request" }), { status: 500 })
    }

}
