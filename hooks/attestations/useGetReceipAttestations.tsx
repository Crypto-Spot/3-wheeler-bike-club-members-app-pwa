
import { getReceiptAttestationsAction } from "@/app/actions/attestation/getReceiptAttestationsAction"
import { useState, useEffect } from "react"

export interface OffchainReceiptAttestation {
    _id: string
    invoiceSchemaID: string
    receiptSchemaID: string
}
export const useGetReceiptAttestations = (address: string| undefined) => {
    const [receiptAttestations, setReceiptAttestations] = useState<OffchainReceiptAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function getReceiptAttestations() {
            if (address) {
                setLoading(true);
                try {
                    
                    const data = await getReceiptAttestationsAction(address)
                    setReceiptAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getReceiptAttestations()
    },[ address ])

    async function getBackReceiptAttestations() {
        if (address) {
            setLoading(true);
            try {
                
                const data = await getReceiptAttestationsAction(address)
                setReceiptAttestations(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
    }

    return {receiptAttestations, loading, error, getBackReceiptAttestations}
}