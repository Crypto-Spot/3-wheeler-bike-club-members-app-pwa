
import { getMemberReceiptAttestationsAction } from "@/app/actions/attestation/getMemberReceiptAttestationsAction"
import { useState, useEffect } from "react"

export interface OffchainMemberReceiptAttestation {
    _id: string
    memberInvoiceAttestationID: string
    memberReceiptAttestationID: string
    amount: number
    currency: string
    week: number
    score: number
}
export const useGetMemberReceiptAttestations = (address: string| undefined) => {
    const [memberReceiptAttestations, setMemberReceiptAttestations] = useState<OffchainMemberReceiptAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function getMemberReceiptAttestations() {
            if (address) {
                setLoading(true);
                try {
                    
                    const data = await getMemberReceiptAttestationsAction(address)
                    setMemberReceiptAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getMemberReceiptAttestations()
    },[ address ])

    async function getBackMemberReceiptAttestations() {
        if (address) {
            setLoading(true);
            try {
                
                const data = await getMemberReceiptAttestationsAction(address)
                setMemberReceiptAttestations(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
    }

    return {memberReceiptAttestations, loading, error, getBackMemberReceiptAttestations}
}