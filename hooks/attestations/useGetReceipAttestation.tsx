
import { getReceiptAttestationsAction } from "@/app/actions/attestation/getReceiptAttestationAction"
import { useState, useEffect } from "react"

export interface OffchainReceiptAttestation {
    _id: string
    receiptSchemaID: string
}
export const useGetReceiptAttestation = (invoiceSchemaID: string| undefined) => {
    const [receiptAttestation, setReceiptAttestation] = useState<OffchainReceiptAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function getReceiptAttestation() {
            if (invoiceSchemaID) {
                setLoading(true);
                try {
                    
                    const data = await getReceiptAttestationsAction(invoiceSchemaID)
                    setReceiptAttestation(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getReceiptAttestation()
    },[ invoiceSchemaID ])

    async function getBackReceiptAttestation() {
        if (invoiceSchemaID) {
            setLoading(true);
            try {
                
                const data = await getReceiptAttestationsAction(invoiceSchemaID)
                setReceiptAttestation(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
    }

    return {receiptAttestation, loading, error, getBackReceiptAttestation}
}