
import { getMemberBadgeAttestationAction } from "@/app/actions/attestation/getMemberBadgeAttestationAction"
import { useState, useEffect } from "react"


interface MemberBadgeAttestation {
    address: string;
    memberBadgeAttestationID: string;
    country: string;
    driverNationalID: string;
    national: boolean
    driverLicenseID: string;
    driverHeadshot: string;
    driverAddress: string;
    driverPhone: string;
    driver: boolean;
    guarantorNationalID: string;
    guarantorHeadshot: string;
    guarantorAddress: string;
    guarantorPhone: string;
    guarantor: boolean;
    status: number;
}

export const useGetMemberBadgeAttestation = (address: string | undefined) => {
    const [memberBadgeAttestation, setMemberBadgeAttestation] = useState<MemberBadgeAttestation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)


    useEffect (() =>{
        async function getMemberBadgeAttestation() {
           
            if(address){
                setLoading(true);
                try {
                    
                    const data = await getMemberBadgeAttestationAction(address)
                    setMemberBadgeAttestation(data)

                } catch(err){
                    setError(err)
                }
                setLoading(false)
            }
        
        }
        getMemberBadgeAttestation()
    },[address])


    async function getBackMemberBadgeAttestation() {
        
        if(address){
            setLoading(true);
            try {
                
                const data = await getMemberBadgeAttestationAction(address)
                setMemberBadgeAttestation(data)

            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        
    }

    return {memberBadgeAttestation, loading, error, getBackMemberBadgeAttestation}
}