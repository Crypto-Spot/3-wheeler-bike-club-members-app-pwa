
import { getHirePurchaseAttestationAction } from "@/app/actions/attestation/getHirePurchaseAttestationAction"
import { useState, useEffect } from "react"


export interface HirePurchaseAttestation {
    address: string;
    memberBadgeAttestationID: string;
    hirePurchaseAttestationID: string;
    vin: string;
    amount: number;
    installments: number;
    firstDate: string;
    lastDate: string;
    contract: string;
}

export const useGetHirePurchaseAttestation = (address: string | undefined) => {
    const [hirePurchaseAttestation, setHirePurchaseAttestation] = useState<HirePurchaseAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getHirePurchaseAttestation() {
           
            if(address){
                setLoading(true);
                try {
                    
                    const data = await getHirePurchaseAttestationAction(address)
                    setHirePurchaseAttestation(data)

                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        
        }
        getHirePurchaseAttestation()
    },[address])


    async function getBackHirePurchaseAttestation() {
        
        if(address){
            setLoading(true);
            try {
                
                const data = await getHirePurchaseAttestationAction(address)
                setHirePurchaseAttestation(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        
    }

    return {hirePurchaseAttestation, loading, error, getBackHirePurchaseAttestation}
}