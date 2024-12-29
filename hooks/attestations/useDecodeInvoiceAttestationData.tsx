
import { decodeAttestation } from "@/utils/attest/decodeAttestation"
import { invoiceSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

interface invoiceSchemaData {
    Amount: BigInt,
    Week: string
}

export const useDecodeInvoiceAttestationData = (attestationData: string| undefined) => {
    const [invoiceAttestationData, setInvoiceAttestationData] = useState<invoiceSchemaData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function decodeInvoiceAttestationData() {
            if (attestationData) {
                setLoading(true);
                try {
                    
                    const data = await decodeAttestation(attestationData, invoiceSchemaData)
                    setInvoiceAttestationData(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        decodeInvoiceAttestationData()
    },[ attestationData ])


    return { invoiceAttestationData, loading, error}
}