import { getPaymentRequest } from "@/utils/cashramp/getPaymentRequest"
import { useEffect, useState } from "react"

interface PaymentRequest {
    id: string;
    paymentType: 'deposit' | 'withdrawal';
    hostedLink: string;
    amount: string;
    currency: string;
    reference: string;
    metadata: any | null;
    status: string;
}



export const useGetPaymentRequest = (reference: string) => {
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        async function fetchPaymentRequest() {
            if (reference) {
                setLoading(true)
                try {
                    const paymentRequest = await getPaymentRequest (reference)
                setPaymentRequest(paymentRequest)
                } catch (err) {
                    setError(err)
                }
                setLoading(false)
            }
        }
        fetchPaymentRequest()
    }, [reference]) 

    return { paymentRequest, loading, error }
    
    
}   
