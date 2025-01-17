
import { decodeAttestation } from "@/utils/attest/decodeAttestation"
import { invoiceSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

export interface invoiceSchemaData {
    Amount: BigInt,
    Week: string
}

export const useDecodeInvoiceAttestationData = (attestationData: string| undefined) => {
    const [invoiceAttestationData, setInvoiceAttestationData] = useState<invoiceSchemaData | null>(null)
    const [loadingDecodeInvoices, setLoadingDecodeInvoices] = useState<boolean>(true)
    const [errorDecodeInvoices, setErrorDecodeInvoices] = useState<any | null>(null)

    

    useEffect (() =>{
        async function decodeInvoiceAttestationData() {
            if (attestationData) {
                setLoadingDecodeInvoices(true);
                try {
                    const data = await decodeAttestation(attestationData, invoiceSchemaData)
                    setInvoiceAttestationData(data)
                } catch(err){
                    setErrorDecodeInvoices(err)
                }
                setLoadingDecodeInvoices(false)
            }
        }
        decodeInvoiceAttestationData()
    },[ attestationData ])


    return { invoiceAttestationData, loadingDecodeInvoices, errorDecodeInvoices}
}