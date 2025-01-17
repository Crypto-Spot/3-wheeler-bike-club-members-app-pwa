
import { decodeAttestation } from "@/utils/attest/decodeAttestation"
import { receiptSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

export interface receiptSchemaData {
    Amount: BigInt,
    //Currency: string
    Week: string,
    Score: number
    
}

export const useDecodeReceiptAttestationData = (attestationData: string| undefined) => {
    const [receiptAttestationData, setReceiptAttestationData] = useState<receiptSchemaData | null>(null)
    const [loadingDecodeReceipts, setLoadingDecodeReceipts] = useState<boolean>(true)
    const [errorDecodeReceipts, setErrorDecodeReceipts] = useState<any | null>(null)


    useEffect (() =>{
        async function decodeReceiptAttestationData() {
            if (attestationData) {
                setLoadingDecodeReceipts(true);
                try {
                    const data = await decodeAttestation(attestationData, receiptSchemaData)
                    setReceiptAttestationData(data)
                } catch(err){
                    setErrorDecodeReceipts(err)
                }
                setLoadingDecodeReceipts(false)
            }
        }
        decodeReceiptAttestationData()
    },[ attestationData ])


    return {receiptAttestationData, loadingDecodeReceipts, errorDecodeReceipts}
}