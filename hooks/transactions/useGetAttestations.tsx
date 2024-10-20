import { getAttestationsAction } from "@/app/actions/attestation/getAttestationsAction"
import { useState, useEffect } from "react"
import { useBlockNumber } from "wagmi"

export interface OffchainAttestation {
    _id: string
    address: string
    week: string
    UID: string
    
}
export const useGetAttestations = (address: string| undefined) => {
    const { data: blockNumber } = useBlockNumber({ watch: true }) 
    const [attestations, setAttestations] = useState<OffchainAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getAttestations = async ()=>{
            if (address) {
                try {
                    
                    const data = await getAttestationsAction(address)
                    setAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getAttestations()
    },[ address, blockNumber ])

    return {attestations, loading, error}
}