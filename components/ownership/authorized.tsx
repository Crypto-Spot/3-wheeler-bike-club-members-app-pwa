import { Caravan, CircleCheck, CircleSlash, PartyPopper } from "lucide-react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useGetMemberReceiptAttestations } from "@/hooks/attestations/useGetMemberReceipAttestations";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useGetMemberBadgeAttestation } from "@/hooks/attestations/useGetMemberBadgeAttestation";
import { revoke } from "@/utils/attestation/revoke";
import { attest } from "@/utils/attestation/attest";
import { deconstructMemberBadgeAttestationData } from "@/utils/attestation/member/badge/deconstructMemberBadgeAttestationData";
import { updateMemberBadgeAttestationByStatusAction } from "@/app/actions/attestation/updateMemberBadgeAttestationByStatusAction";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

export function Authorized() {

    const {user} = usePrivy();
    console.log(user)

    const [loading, setLoading] = useState(false)
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    
    const { memberReceiptAttestations } = useGetMemberReceiptAttestations( smartWallet?.address )
    console.log(memberReceiptAttestations)

    const { memberBadgeAttestation, getBackMemberBadgeAttestation } = useGetMemberBadgeAttestation( smartWallet?.address )
    console.log(memberBadgeAttestation)

    const router = useRouter();
    
    async function apply() {
        setLoading(true)
        if (!memberBadgeAttestation?.memberBadgeAttestationID) return;

        // Revoke previous member badge attestation
        const revokeMemberBadgeAttestation = await revoke(memberBadgeAttestation.memberBadgeAttestationID)

        if (revokeMemberBadgeAttestation) {
            // Create new credit score attestation
            const deconstructedMemberBadgeAttestationData = await deconstructMemberBadgeAttestationData(
                [smartWallet?.address as string],
                memberBadgeAttestation.country, 
                false,
                false,
                false,
                1
            )

            const memberBadgeAttested = await attest(deconstructedMemberBadgeAttestationData)

            if (memberBadgeAttested) {
                await updateMemberBadgeAttestationByStatusAction(
                    smartWallet?.address as string,
                    memberBadgeAttested.attestationId,
                    1
                )
            }
        }
        getBackMemberBadgeAttestation()
        setLoading(false)
        
    }
    
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                
                <Menu/>

                <div className="flex w-full justify-center mb-4">
                    <Alert className="w-full max-w-[66rem]">
                        <Caravan className="h-4 w-4" />
                        <AlertTitle className="font-bold">Ownership!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Finance the ownership of your 3wheeler.
                        </AlertDescription>
                    </Alert>
                </div>
                {
                    !memberReceiptAttestations 
                    ? ( <>loading...</> ) 
                    :(
                        <>
                            {
                                memberReceiptAttestations.length >= 1 
                                ? (
                                    <>
                                        {
                                            memberBadgeAttestation?.status === 0
                                            &&(
                                                <>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                            <CircleCheck className="h-36 w-36" />
                                                            <p className="text-center text-lg">You are qualified to recieve a 3wheeler. Click below to apply & report at our office for in-person verification</p>
                                                            <Button onClick={apply}>
                                                            {
                                                                loading
                                                                ? (
                                                                    <>
                                                                        <motion.div
                                                                        initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                                                        animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                                                        transition={{
                                                                            duration: 1, // Animation duration in seconds
                                                                            repeat: Infinity, // Infinity will make it rotate indefinitely
                                                                            ease: "linear", // Animation easing function (linear makes it constant speed)
                                                                        }}
                                                                    >
                                                                            <DotsHorizontalIcon/>
                                                                        </motion.div>
                                                                    </>
                                                                )
                                                                : (
                                                                    <>
                                                                        Apply
                                                                    </>
                                                                )
                                                            }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) 
                                        }
                                        {
                                            memberBadgeAttestation?.status === 1
                                            &&(
                                                <>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                            <PartyPopper className="h-36 w-36" />
                                                            <p className="text-center text-2xl">Congrats you have applied for a 3wheeler.</p>
                                                            <p className="text-center text-lg">Come to our location with a guarantor, verify your identity and get started!</p>
                                        
                                                        </div>
                                                    </div>
                                                </>
                                            )

                                        }
                                    </>
                                ) 
                            
                                : (
                                    <>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                <CircleSlash className="h-36 w-36" />
                                                <p className="text-center text-lg">You are not qualified to recieve a 3wheeler yet. Pay at least one membreship dues & come back to apply</p>
                                                <Button onClick={() => router.push('/membership')}>Pay Dues</Button>
                                            </div>
                                        </div>
                                       
                                    </>
                                )
                            }
                        </>
                    )
                }
                
                
            </div>
        </main>
    )
}