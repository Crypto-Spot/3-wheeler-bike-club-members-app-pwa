
import { getInvoiceAttestationsAction } from "@/app/actions/attestation/getInvoiceAttestationsAction"
import { useState, useEffect } from "react"
import { useBlockNumber } from "wagmi"

export interface OffchainInvoiceAttestation {
    _id: string
    invoiceSchemaID: string
}
export const useGetInvoiceAttestations = (address: string| undefined) => {
    const { data: blockNumber } = useBlockNumber({ watch: true }) 
    const [invoiceAttestations, setInvoiceAttestations] = useState<OffchainInvoiceAttestation[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getInvoiceAttestations = async ()=>{
            if (address) {
                try {
                    
                    const data = await getInvoiceAttestationsAction(address)
                    setInvoiceAttestations(data)
                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        }
        getInvoiceAttestations()
    },[ address, blockNumber ])

    return {invoiceAttestations, loading, error}
}