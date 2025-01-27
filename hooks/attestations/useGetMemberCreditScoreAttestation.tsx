import { getMemberCreditScoreAttestationAction } from "@/app/actions/attestation/getMemberCreditScoreAttestationAction"
import { useEffect } from "react"

import { useState } from "react"

export interface OffchainMemberCreditScoreAttestation {
    _id: string
    memberCreditScoreAttestationID: string
    score: number
    paidWeeks: number
    invoicedWeeks: number
    createdAt: string
    updatedAt: string
}
export function useGetMemberCreditScoreAttestation (address: string | undefined) {
    const [memberCreditScoreAttestation, setMemberCreditScoreAttestation] = useState<OffchainMemberCreditScoreAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getMemberCreditScoreAttestation() {
            if (address) {
                setLoading(true)
                try {
                    const data = await getMemberCreditScoreAttestationAction(address)
                    setMemberCreditScoreAttestation(data)
                } catch (error) {
                    setError(error)
                }
                setLoading(false)
            }
        }
        getMemberCreditScoreAttestation()
    }, [address])

    async function getBackMemberCreditScoreAttestation() {
        if (address) {
            setLoading(true)
            try {
                const data = await getMemberCreditScoreAttestationAction(address)
                setMemberCreditScoreAttestation(data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
    }

    return { memberCreditScoreAttestation, loading, error, getBackMemberCreditScoreAttestation }
}