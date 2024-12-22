
import { getInvoiceAttestationsAction } from "@/app/actions/attestation/getInvoiceAttestationsAction"
import { useState, useEffect } from "react"

export interface OffchainInvoiceAttestation {
    _id: string
    invoiceSchemaID: string
}
export const useGetInvoiceAttestations = (address: string| undefined) => {
    const [invoiceAttestations, setInvoiceAttestations] = useState<OffchainInvoiceAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function getInvoiceAttestations() {
            if (address) {
                setLoading(true);
                try {
                    
                    const data = await getInvoiceAttestationsAction(address)
                    setInvoiceAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getInvoiceAttestations()
    },[ address ])

    async function getBackInvoiceAttestations() {
        if (address) {
            setLoading(true);
            try {
                
                const data = await getInvoiceAttestationsAction(address)
                setInvoiceAttestations(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
    }

    return {invoiceAttestations, loading, error, getBackInvoiceAttestations}
}