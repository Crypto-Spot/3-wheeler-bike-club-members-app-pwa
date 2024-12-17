
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
        const getInvoiceAttestations = async ()=>{
            if (address) {
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

    return {invoiceAttestations, loading, error}
}