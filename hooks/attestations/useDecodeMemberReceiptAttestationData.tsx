
import { decodeAttestation } from "@/utils/attestation/decodeAttestation"
import { memberReceiptSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

export interface memberReceiptSchemaData {
    Amount: BigInt,
    Currency: string
    Week: string,
    Score: number
    
}

export const useDecodeMemberReceiptAttestationData = (attestationData: string| undefined) => {
    const [memberReceiptAttestationData, setMemberReceiptAttestationData] = useState<memberReceiptSchemaData | null>(null)
    const [loadingDecodeMemberReceipts, setLoadingDecodeMemberReceipts] = useState<boolean>(true)
    const [errorDecodeMemberReceipts, setErrorDecodeMemberReceipts] = useState<any | null>(null)


    useEffect (() =>{
        async function decodeMemberReceiptAttestationData() {
            if (attestationData) {
                setLoadingDecodeMemberReceipts(true);
                try {
                    const data = await decodeAttestation(attestationData, memberReceiptSchemaData)
                    setMemberReceiptAttestationData(data)
                } catch(err){
                    setErrorDecodeMemberReceipts(err)
                }
                setLoadingDecodeMemberReceipts(false)
            }
        }
        decodeMemberReceiptAttestationData()
    },[ attestationData ])


    return {memberReceiptAttestationData, loadingDecodeMemberReceipts, errorDecodeMemberReceipts}
}