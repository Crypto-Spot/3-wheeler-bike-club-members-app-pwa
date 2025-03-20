import { getHirePurchaseCreditScoreAttestationAction } from "@/app/actions/attestation/getHirePurchaseCreditScoreAttestationAction"
import { useEffect } from "react"

import { useState } from "react"

export interface OffchainHirePurchaseCreditScoreAttestation {
    _id: string
    hirePurchaseAttestationID: string
    hirePurchaseCreditScoreAttestationID: string
    score: number
    paidWeeks: number
    invoicedWeeks: number
    createdAt: string
    updatedAt: string
}
export function useGetHirePurchaseCreditScoreAttestation (address: string | undefined) {
    const [hirePurchaseCreditScoreAttestation, setHirePurchaseCreditScoreAttestation] = useState<OffchainHirePurchaseCreditScoreAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getHirePurchaseCreditScoreAttestation() {
            if (address) {
                setLoading(true)
                try {
                    const data = await getHirePurchaseCreditScoreAttestationAction(address)
                    setHirePurchaseCreditScoreAttestation(data)
                } catch (error) {
                    setError(error)
                }
                setLoading(false)
            }
        }
        getHirePurchaseCreditScoreAttestation()
    }, [address])

    async function getBackHirePurchaseCreditScoreAttestation() {
        if (address) {
            setLoading(true)
            try {
                const data = await getHirePurchaseCreditScoreAttestationAction(address)
                setHirePurchaseCreditScoreAttestation(data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
    }

    return { hirePurchaseCreditScoreAttestation, loading, error, getBackHirePurchaseCreditScoreAttestation }
}