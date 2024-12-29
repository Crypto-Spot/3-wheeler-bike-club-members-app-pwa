
import { getAttestation } from "@/utils/attest/getAttestation"
import { AttestationInfo } from "@ethsign/sp-sdk"
import { useState, useEffect } from "react"


export const useGetAttestationData = (attestationID: string| undefined) => {
    const [attestation, setAttestation] = useState<AttestationInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        async function getAttestationData() {
            if (attestationID) {
                setLoading(true);
                try {
                    
                    const data = await getAttestation(`onchain_evm_42220_${attestationID}`)
                    setAttestation(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getAttestationData()
    },[ attestationID ])


    return {attestation, loading, error}
}