
import { decodeAttestation } from "@/utils/attest/decodeAttestation"
import { receiptSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

interface receiptSchemaData {
    Amount: BigInt,
    //Currency: string
    Week: string,
    Score: number
    
}

export const useDecodeReceiptAttestationData = (attestationData: string| undefined) => {
    const [receiptAttestation, setReceiptAttestation] = useState<receiptSchemaData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function decodeReceiptAttestationData() {
            if (attestationData) {
                setLoading(true);
                try {
                    
                    const data = await decodeAttestation(attestationData, receiptSchemaData)
                    setReceiptAttestation(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        decodeReceiptAttestationData()
    },[ attestationData ])


    return {receiptAttestation, loading, error}
}