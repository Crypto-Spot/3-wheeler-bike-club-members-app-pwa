
import { getReceiptAttestationsAction } from "@/app/actions/attestation/getReceiptAttestationAction"
import { useState, useEffect } from "react"

export interface OffchainReceiptAttestation {
    _id: string
    receiptSchemaID: string
}
export const useGetReceiptAttestation = (address: string| undefined) => {
    const [receiptAttestation, setReceiptAttestation] = useState<OffchainReceiptAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getReceiptAttestation = async ()=>{
            if (address) {
                try {
                    
                    const data = await getReceiptAttestationsAction(address)
                    setReceiptAttestation(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getReceiptAttestation()
    },[ address ])

    return {receiptAttestation, loading, error}
}