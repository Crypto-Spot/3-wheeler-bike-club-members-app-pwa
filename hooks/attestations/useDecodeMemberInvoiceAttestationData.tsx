
import { decodeAttestation } from "@/utils/attest/decodeAttestation"
import { memberInvoiceSchemaData } from "@/utils/constants/addresses"
import { useState, useEffect } from "react"

export interface memberInvoiceSchemaData {
    Amount: BigInt,
    Week: string
}

export const useDecodeMemberInvoiceAttestationData = (attestationData: string| undefined) => {
    const [memberInvoiceAttestationData, setMemberInvoiceAttestationData] = useState<memberInvoiceSchemaData | null>(null)
    const [loadingDecodeMemberInvoices, setLoadingDecodeMemberInvoices] = useState<boolean>(true)
    const [errorDecodeMemberInvoices, setErrorDecodeMemberInvoices] = useState<any | null>(null)

    

    useEffect (() =>{
        async function decodeMemberInvoiceAttestationData() {
            if (attestationData) {
                setLoadingDecodeMemberInvoices(true);
                try {
                    const data = await decodeAttestation(attestationData, memberInvoiceSchemaData)
                    setMemberInvoiceAttestationData(data)
                } catch(err){
                    setErrorDecodeMemberInvoices(err)
                }
                setLoadingDecodeMemberInvoices(false)
            }
        }
        decodeMemberInvoiceAttestationData()
    },[ attestationData ])


    return { memberInvoiceAttestationData, loadingDecodeMemberInvoices, errorDecodeMemberInvoices}
}