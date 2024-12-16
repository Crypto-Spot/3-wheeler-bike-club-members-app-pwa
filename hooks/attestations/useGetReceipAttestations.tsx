
import { getReceiptAttestationsAction } from "@/app/actions/attestation/getReceiptAttestationsAction"
import { useState, useEffect } from "react"
import { useBlockNumber } from "wagmi"

export interface OffchainReceiptAttestation {
    _id: string
    receiptSchemaID: string
}
export const useGetReceiptAttestations = (address: string| undefined) => {
    const { data: blockNumber } = useBlockNumber({ watch: true }) 
    const [receiptAttestations, setReceiptAttestations] = useState<OffchainReceiptAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getReceiptAttestations = async ()=>{
            if (address) {
                try {
                    
                    const data = await getReceiptAttestationsAction(address)
                    setReceiptAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getReceiptAttestations()
    },[ address, blockNumber ])

    return {receiptAttestations, loading, error}
}